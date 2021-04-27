import "./profile-tournaments.scss"

import React from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Search from "../../components/Search/Search";
import Button from "../../components/Button";
import MyInputRange from "../../components/MyInputRange/MyInputRange"
import TournamentsDynamicTable from "../../components/tournaments/TournamentsDynamicTable";
import {$authHost} from "../../http";
import CheckboxList from "../../components/Checkbox/CheckboxList";


const fetchTypes = async () => {
    return await $authHost.get('/bracketTypes', {
        params: {
            sort: ['createdDate', 'asc'].join(','),
        }
    })
        .then((response) => response.data)
        .catch((e) => alert(e))
}


const fetchTournaments = async (page, size, filters) => {
    const params = {
        projection: 'bracketType',
        sort: ['createdDate', 'desc'].join(','),
        page: page,
        size: size
    }
    let url;

    if (filters && (filters.name || filters.types || filters.range?.start || filters.range?.end)) {
        url = '/tournaments/search/filters'
        params.name = filters.name || null
        params.types = filters?.types.join(',') || null
        params.start = filters?.range.start || null
        params.end = filters?.range.end || null
    } else {
        url = '/tournaments/search/my'
    }

    return await $authHost.get(url, {params: params})
        .then((response) => response.data)
        .catch((e) => alert(e))
}


class ProfileTournaments extends React.Component {
    PAGE_SIZE = 4
    MIN_RANGE_VALUE = 0
    MAX_RANGE_VALUE = 128
    RANGE_STEP = 4

    constructor(props) {
        super(props);
        this.state = {
            isApplied: false,
            checkboxList: [],
            searchValue: '',
            rangeValue: {min: 0, max: 128},
            tournaments: [],
            currentPage: 0,
            lastPage: 0
        }
    }

    componentDidMount() {
        fetchTypes().then((data) => {
            const bracketTypes = data?._embedded.bracketTypes || []
            this.setState({
                checkboxList: bracketTypes.map((type, i) => {
                    return {
                        id: type.id,
                        value: type.type,
                        name: type.type,
                        checked: false,
                        onChange: () => {
                            this.setState({
                                checkboxList: this.state.checkboxList.map((checkbox, j) => {
                                    checkbox.checked = i === j ? !checkbox.checked : checkbox.checked
                                    return checkbox
                                }),
                                isApplied: false
                            })
                        }
                    }
                })
            })
        })
        this._updateTournamentPage(this.state.currentPage)
    }

    handleSearchInput = (event) => {
        if (event.target.value.length < 32) {
            this.setState({isApplied: false, searchValue: event.target.value})
        }
    }

    handleRangeInput = (value) => {
        if (value.min >= this.MIN_RANGE_VALUE && value.max <= this.MAX_RANGE_VALUE) {
            this.setState({isApplied: false, rangeValue: value})
        }
    }

    handleNextPage = () => {
        if (this.state.currentPage < this.state.lastPage) {
            this._updateTournamentPage(this.state.currentPage + 1, this._getFilters(this.state.isApplied))
        }
    }

    handlePrevPage = () => {
        if (this.state.currentPage > 0) {
            this._updateTournamentPage(this.state.currentPage - 1, this._getFilters(this.state.isApplied))
        }
    }

    handleApplyOrSearchButton = (event) => {
        event.preventDefault()
        this.setState({isApplied: true})
        this._updateTournamentPage(0, this._getFilters(true))
    }

    render() {
        return (
            <div className="container">
                <OnPageNavigation/>
                <div className="filter-section">
                    <h2>Мои турниры</h2>
                    <Search
                        value={this.state.searchValue}
                        onChange={this.handleSearchInput}
                        onSubmit={this.handleApplyOrSearchButton}
                    />
                    <div className="filters">
                        <h4>Фильтры</h4>
                        <div className="filters-row">
                            <div className="tournament-format">
                                <h6>Формат турнира</h6>
                                <div className="tournament-format__checkboxes">
                                    <CheckboxList checkboxList={this.state.checkboxList}/>
                                </div>
                            </div>
                            <div className="teams-range">
                                <h6>Количество участников</h6>
                                <MyInputRange
                                    maxValue={this.MAX_RANGE_VALUE}
                                    minValue={this.MIN_RANGE_VALUE}
                                    step={this.RANGE_STEP}
                                    value={this.state.rangeValue}
                                    onChange={this.handleRangeInput}
                                />
                            </div>
                        </div>
                        <Button class="red" onClick={this.handleApplyOrSearchButton}>Применить</Button>
                    </div>
                </div>
                <div className="table-section">
                    <TournamentsDynamicTable
                        tournaments={this.state.tournaments}
                        page={this.state.currentPage}
                        prevPage={this.handlePrevPage}
                        nextPage={this.handleNextPage}
                    />
                </div>
            </div>
        );
    }

    _updateTournamentPage = (page, ...args) => {
        fetchTournaments(page, this.PAGE_SIZE, args[0]).then((data) => {
            this.setState({
                tournaments: data?._embedded.tournaments.map((t) => {
                    t.date = t.createdDate
                    return t
                }) || [],
                currentPage: page,
                lastPage: data?.page.totalPages - 1
            })
        })
    }

    _getFilters = (isApplied) => {
        const filters = {
            name: this.state.searchValue,
            types: this.state.checkboxList.filter((el) => el.checked).map((el) => el.value),
            range: {
                start: this.state.rangeValue.min,
                end: !this.state.rangeValue.min && this.state.rangeValue.max === this.MAX_RANGE_VALUE ?
                    null : this.state.rangeValue.max
            }
        }
        return isApplied ? filters : null
    }
}

export default ProfileTournaments;
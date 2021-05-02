import "./profile-tournaments.scss"

import React, {useEffect, useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Search from "../../components/Search/Search";
import Button from "../../components/Button";
import MyInputRange from "../../components/MyInputRange/MyInputRange"
import TournamentsDynamicTable from "../../components/tournaments/TournamentsDynamicTable";
import CheckboxList from "../../components/Checkbox/CheckboxList";
import {fetchTournaments, fetchTournamentTypes} from "../../http/authorized";

const ProfileTournaments = () => {
    const [search, setSearch] = useState({value: '', isApplied: false})
    const [filters, setFilters] = useState({checkboxList: [], rangeValue: {min: 0, max: 128}, isApplied: false})
    const [state, setState] = useState({tournaments: [], currentPage: 0, lastPage: 0})
    let loading = false

    const updateTournamentsPage = (page, filters) => {
        loading = true
        fetchTournaments(page, PAGE_SIZE, filters).then(([tournaments, pageData]) => {
            setState({
                tournaments: tournaments.map((t) => {
                    t.date = t.createdDate
                    return t
                }),
                currentPage: page,
                lastPage: pageData.totalPages - 1
            })
            loading = false
        })
    }

    const handleSearchInput = (event) => {
        const value = event.target.value
        if (value.length < 32) {
            setSearch({value: value, isApplied: false})
        }
        if (!value) {
            updateTournamentsPage(state.currentPage)
        }
    }

    const handleSearchButton = () => {
        if (!loading) {
            const newSearch = {value: search.value, isApplied: true}
            setSearch(newSearch)
            updateTournamentsPage(0, getFilters(newSearch, filters))
        }
    }

    const handleCheckboxListChange = (i) => {
        setFilters({
            checkboxList: filters.checkboxList.map((checkbox, j) => {
                checkbox.checked = i === j ? !checkbox.checked : checkbox.checked
                return checkbox
            }),
            rangeValue: filters.rangeValue,
            isApplied: false
        })
    }

    const handleRangeInput = (value) => {
        if (value.min >= MIN_RANGE_VALUE && value.max <= MAX_RANGE_VALUE) {
            setFilters({checkboxList: filters.checkboxList, rangeValue: value, isApplied: false})
        }
    }

    const handleFiltersApplyButton = () => {
        if (!loading) {
            const newFilers = {checkboxList: filters.checkboxList, rangeValue: filters.rangeValue, isApplied: true}
            setFilters(newFilers)
            updateTournamentsPage(0, getFilters(search, newFilers))
        }
    }

    const nextPage = () => {
        if (state.currentPage < state.lastPage && !loading) {
            updateTournamentsPage(state.currentPage + 1, getFilters(search, filters))
        }
    }

    const prevPage = () => {
        if (state.currentPage > 0 && !loading) {
            updateTournamentsPage(state.currentPage - 1, getFilters(search, filters))
        }
    }

    useEffect(() => {
        fetchTournamentTypes().then((bracketTypes) => {
            setFilters({
                checkboxList: bracketTypes.map((type) => {
                    return {
                        id: type.id,
                        value: type.type,
                        name: type.type,
                        checked: false
                    }
                }),
                rangeValue: filters.rangeValue,
                isApplied: false
            })
            updateTournamentsPage(0)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="container">
                <OnPageNavigation/>
                <div className="filter-section">
                    <h2>Мои турниры</h2>
                    <Search
                        value={search.value}
                        onChange={handleSearchInput}
                        onSubmit={handleSearchButton}
                    />
                    <div className="filters">
                        <h4>Фильтры</h4>
                        <div className="filters-row">
                            <div className="tournament-format">
                                <h6>Формат турнира</h6>
                                <div className="tournament-format__checkboxes">
                                    <CheckboxList checkboxList={filters.checkboxList}
                                                  onChange={handleCheckboxListChange}/>
                                </div>
                            </div>
                            <div className="teams-range">
                                <h6>Количество участников</h6>
                                <MyInputRange
                                    maxValue={MAX_RANGE_VALUE}
                                    minValue={MIN_RANGE_VALUE}
                                    step={RANGE_STEP}
                                    value={filters.rangeValue}
                                    onChange={handleRangeInput}
                                />
                            </div>
                        </div>
                        <Button class="red" onClick={handleFiltersApplyButton}>Применить</Button>
                    </div>
                </div>
                <div className="table-section">
                    <TournamentsDynamicTable
                        tournaments={state.tournaments}
                        page={state.currentPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileTournaments;


const PAGE_SIZE = 10
const MIN_RANGE_VALUE = 0
const MAX_RANGE_VALUE = 128
const RANGE_STEP = 4

const getFilters = (search, filters) => {
    const _filters = {name: search.isApplied ? search.value : ''}
    if (filters.isApplied) {
        _filters.types = filters.checkboxList.filter((el) => el.checked).map((el) => el.value)
        _filters.range = {
            start: filters.rangeValue.min,
            end: filters.rangeValue.max
        }
    }

    return _filters
}
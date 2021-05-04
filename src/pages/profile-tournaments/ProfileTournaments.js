import "./profile-tournaments.scss"

import React, {useEffect} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Search from "../../components/Search/Search";
import Button from "../../components/Button";
import MyInputRange from "../../components/MyInputRange/MyInputRange"
import TournamentsDynamicTable from "../../components/tournaments/TournamentsDynamicTable";
import CheckboxList from "../../components/Checkbox/CheckboxList";
import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";

const ProfileTournaments = () => {
    const {userStore} = useStore()
    const pageableTournamentStore = userStore.user.pageableTournamentStore

    const handleSearchInput = (event) => {
        const value = event.target.value
        if (value.length < 32) {
            pageableTournamentStore.search.setValue(value)
        }
        if (!value) {
            pageableTournamentStore.load()
        }
    }

    const handleSearchButton = () => {
        pageableTournamentStore.search.apply()
        pageableTournamentStore.load()
    }

    const handleRangeInput = (value) => {
        if (value.min >= MIN_RANGE_VALUE && value.max <= MAX_RANGE_VALUE) {
            pageableTournamentStore.filter.range.setValue(value)
        }
    }

    const handleFiltersApplyButton = () => {
        pageableTournamentStore.filter.apply()
        pageableTournamentStore.load()
    }

    const nextPage = () => {
        pageableTournamentStore.onNextPage()
    }

    const prevPage = () => {
        pageableTournamentStore.onPrevPage()
    }

    useEffect(() => {
        pageableTournamentStore.filter.load()
    }, [pageableTournamentStore])

    return (
        <div>
            <div className="container">
                <OnPageNavigation/>
                <div className="filter-section">
                    <h2>Мои турниры</h2>
                    <Search
                        value={pageableTournamentStore.search.value}
                        onChange={handleSearchInput}
                        onSubmit={handleSearchButton}
                    />
                    <div className="filters">
                        <h4>Фильтры</h4>
                        <div className="filters-row">
                            <div className="tournament-format">
                                <h6>Формат турнира</h6>
                                <div className="tournament-format__checkboxes">
                                    <CheckboxList checkboxList={pageableTournamentStore.filter.checkboxList}/>
                                </div>
                            </div>
                            <div className="teams-range">
                                <h6>Количество участников</h6>
                                <MyInputRange
                                    maxValue={MAX_RANGE_VALUE}
                                    minValue={MIN_RANGE_VALUE}
                                    step={RANGE_STEP}
                                    value={pageableTournamentStore.filter.range}
                                    onChange={handleRangeInput}
                                />
                            </div>
                        </div>
                        <Button class="red" onClick={handleFiltersApplyButton}>Применить</Button>
                    </div>
                </div>
                <div className="table-section">
                    <TournamentsDynamicTable
                        tournaments={pageableTournamentStore.tournaments}
                        page={pageableTournamentStore.page.number}
                        prevPage={prevPage}
                        nextPage={nextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(ProfileTournaments);


const MIN_RANGE_VALUE = 0
const MAX_RANGE_VALUE = 128
const RANGE_STEP = 4
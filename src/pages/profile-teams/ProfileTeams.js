import "./profile-teams.scss"

import React, {useEffect} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Search from "../../components/Search/Search";
import TeamsTable from "../../components/teams/TeamsTable";
import useStore from "../../hooks/useStore";
import {observer} from "mobx-react-lite";

const ProfileTeams = () => {
    const {userStore} = useStore()
    const pageableTeamStore = userStore.user.pageableTeamStore

    const handleSearchInput = (event) => {
        const value = event.target.value

        if (value.length < 32) {
            pageableTeamStore.search.setValue(value)
        }

        if (!value) {
            pageableTeamStore.load()
        }
    }

    const handleSearchButton = () => {
        pageableTeamStore.search.apply()
        pageableTeamStore.load()
    }

    const nextPage = () => {
        pageableTeamStore.onNextPage()
    }

    const prevPage = () => {
        pageableTeamStore.onPrevPage()
    }

    useEffect(() => {
        document.title = 'Мои команды'
    }, [])

    useEffect(() => {
        pageableTeamStore.load()
    }, [pageableTeamStore])

    return (
        <div className="container">
            <OnPageNavigation/>
            <div className="filter-section">
                <h2>Мои команды</h2>
                <Search
                    value={pageableTeamStore.search.value}
                    onChange={handleSearchInput}
                    onSubmit={handleSearchButton}
                />
            </div>
            <div className="table-section">
                <TeamsTable
                    teams={pageableTeamStore.teams}
                    currentPage={pageableTeamStore.page.number}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </div>
        </div>
    );
};

export default observer(ProfileTeams);
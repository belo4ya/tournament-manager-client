import "./profile-teams.scss"

import React, {useEffect, useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Search from "../../components/Search/Search";
import TeamsTable from "../../components/teams/TeamsTable";
import {fetchTeams} from "../../http/authorized";

const ProfileTeams = () => {
    const [search, setSearch] = useState({value: '', isApplied: false})
    const [state, setState] = useState({teams: [], currentPage: 0, lastPage: 0})
    let loading = false

    const updateTeamsPage = (page, teamName) => {
        loading = true
        fetchTeams(page, teamName).then(([teams, pageData]) => {
            setState({teams: teams, currentPage: page, lastPage: pageData.totalPages - 1})
            loading = false
        })
    }

    const handleSearchInput = (event) => {
        setSearch({value: event.target.value, isApplied: false})
        if (!event.target.value) {
            updateTeamsPage(state.currentPage)
        }
    }

    const handleSearchButton = () => {
        setSearch({value: search.value, isApplied: true})
        updateTeamsPage(0, search.value)
    }

    const nextPage = () => {
        if (state.currentPage < state.lastPage && !loading) {
            updateTeamsPage(state.currentPage + 1, search.isApplied ? search.value : '')
        }
    }

    const prevPage = () => {
        if (state.currentPage > 0 && !loading) {
            updateTeamsPage(state.currentPage - 1, search.isApplied ? search.value : '')
        }
    }

    useEffect(() => {
        updateTeamsPage(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container">
            <OnPageNavigation/>
            <div className="filter-section">
                <h2>Мои команды</h2>
                <Search
                    value={search.value}
                    onChange={handleSearchInput}
                    onSubmit={handleSearchButton}
                />
            </div>
            <div className="table-section">
                <TeamsTable
                    teams={state.teams}
                    currentPage={state.currentPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </div>
        </div>
    );
};

export default ProfileTeams;
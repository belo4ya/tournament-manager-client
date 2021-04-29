import "./profile-teams.scss"

import React, {useEffect, useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Search from "../../components/Search/Search";
import TeamsTable from "../../components/teams/TeamsTable";
import {$authHost} from "../../http";


const getTeams = async (page, teamName) => {
    const url = teamName ? `/teams/search/like?team=${teamName}` : '/teams/search/my'
    return await $authHost(url, {
        params: {
            sort: ['rating', 'desc'].join(','),
            page: page,
            size: 15
        }
    })
        .then((response) => response.data)
        .catch((e) => alert(e))
}


const ProfileTeams = () => {
    const [searchWord, setSearchWord] = useState()
    const [teams, setTeams] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)

    const handleChangeTeamInput = (event) => {
        setSearchWord(event.target.value)
        if (!event.target.value) {
            getTeams(currentPage).then((data) => {
                setTeams(data._embedded.teams)
                setLastPage(data.page.totalPages - 1)
            })
        }
    }

    const handleSearchButton = (event) => {
        event.preventDefault()
        getTeams(0, searchWord).then((data) => {
            setTeams(data._embedded.teams)
            setLastPage(data.page.totalPages - 1)
        })
    }

    const nextPage = () => {
        if (currentPage < lastPage) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        getTeams(currentPage).then((data) => {
            setTeams(data._embedded.teams)
            setLastPage(data.page.totalPages - 1)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container">
            <OnPageNavigation/>
            <div className="filter-section">
                <h2>Мои команды</h2>
                <Search
                    value={searchWord}
                    onChange={handleChangeTeamInput}
                    onSubmit={handleSearchButton}
                />
            </div>
            <div className="table-section">
                <TeamsTable
                    teams={teams}
                    currentPage={currentPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </div>
        </div>
    );
};

export default ProfileTeams;
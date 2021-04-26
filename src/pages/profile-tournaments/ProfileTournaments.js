import "./profile-tournaments.scss"

import React, {useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Search from "../../components/Search/Search";
import Button from "../../components/Button";
import MyInputRange from "../../components/MyInputRange/MyInputRange"
import TournamentsDynamicTable from "../../components/tournaments/TournamentsDynamicTable";
import {$authHost} from "../../http";
import CheckboxList from "../../components/Checkbox/CheckboxList";


const getTypes = async () => {
    return await $authHost.get('/bracketTypes', {
        params: {
            sort: ['createdDate', 'asc'].join(','),
        }
    })
        .then((response) => response.data)
        .catch((e) => alert(e))
}


const getTournaments = async () => {
    return await $authHost.get('/tournaments/search/my', {
        params: {
            projection: 'bracketType',
            sort: ['createdDate', 'desc'].join(','),
        }
    })
        .then((response) => response.data)
        .catch((e) => alert(e))
}


const ProfileTournaments = () => {
    const data = getTypes()

    const [searchValue, setSearchValue] = useState('')
    const [checkedList, setCheckedList] = useState([
        {
            id: '',
            name: '',
            value: '',
            checked: false,
            onChange: () => {}
        }
    ])
    const [rangeValue, setRangeValue] = useState({min: 8, max: 16})
    const [tournaments, setTournaments] = useState([
        {
            id: 1,
            name: 'Test',
            logo: 'logo.png',
            bracketType: 'Single Elimination',
            totalTeams: 16,
            date: '14:13 12/12/2012',
        },
        {
            id: 2,
            name: 'Test',
            logo: 'logo.png',
            bracketType: 'Single Elimination',
            totalTeams: 16,
            date: '14:13 12/12/2012',
        },
        {
            id: 3,
            name: 'Test',
            logo: 'logo.png',
            bracketType: 'Single Elimination',
            totalTeams: 16,
            date: '14:13 12/12/2012',
        },
    ])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)


    const handleApplyAndSearchButton = (event) => {
        event.preventDefault()
    }

    const nextPage = () => {
        if (currentPage < lastPage) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    return (
        <div className="container">
            <OnPageNavigation/>
            <div className="filter-section">
                <h2>Мои турниры</h2>
                <Search
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onSubmit={handleApplyAndSearchButton}
                />
                <div className="filters">
                    <h4>Фильтры</h4>
                    <div className="filters-row">
                        <div className="tournament-format">
                            <h6>Формат турнира</h6>
                            <div className="tournament-format__checkboxes">
                                <CheckboxList checkboxList={checkedList}/>
                            </div>
                        </div>
                        <div className="teams-range">
                            <h6>Количество участников</h6>
                            <MyInputRange
                                maxValue={64}
                                minValue={0}
                                step={2}
                                value={rangeValue}
                                onChange={(value) => setRangeValue(value)}
                            />
                        </div>
                    </div>
                    <Button class="red" onClick={handleApplyAndSearchButton}>Применить</Button>
                </div>
            </div>
            <div className="table-section">
                <TournamentsDynamicTable
                    tournaments={tournaments}
                    page={currentPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </div>
        </div>
    );
};

export default ProfileTournaments;
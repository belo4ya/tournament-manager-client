import './main.scss'

import React, {useEffect, useState} from 'react';
import SignInModalForm from "../../components/modals/SignInModalForm";
import SignUpModalForm from "../../components/modals/SignUpModalForm";
import PageSelector from "../../components/PageSelector/PageSelector";
import Button from "../../components/Button"
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import {$host} from "../../http";
import {TOURNAMENT_ENDPOINT} from "../../utils/endpoints";


const getTournaments = async (page, size = 2) => {
    return await $host.get(
        TOURNAMENT_ENDPOINT, {
            params: {
                projection: 'bracketType',
                sort: ['createdDate', 'desc'].join(','),
                page: page,
                size: size
            }
        }
    )
        .then((response) => {
            return response.data
        })
        .catch((e) => {
            alert(e)
            return {_embedded: {tournaments: []}, page: {totalPages: 1}}
        })
}


const Main = () => {
    const [tournaments, setTournaments] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        getTournaments(currentPage).then((data) => {
            setTournaments(data._embedded.tournaments)
            setLastPage(data.page.totalPages - 1)
        })
    }, [currentPage])

    const nextPage = () => {
        if (currentPage < lastPage) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    return (
        <div>
            <SignInModalForm/>
            <SignUpModalForm/>

            <section className="section-header">
                <div className="container">
                    <div className="content">
                        <h1>Генератор турнирных сеток и таблиц</h1>
                        <Button class="black main">Попробовать</Button>
                    </div>
                </div>
            </section>

            <section className="section-main">
                <div className="container">
                    <div className="tournaments-sheet">
                        <div className="title">
                            <h2>Последние турниры</h2>
                        </div>
                        <div className="tournaments">
                            <TournamentsStaticTable tournaments={tournaments}/>
                            <PageSelector page={currentPage + 1} onPrevPage={prevPage} onNextPage={nextPage}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Main;
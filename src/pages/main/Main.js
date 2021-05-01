import './main.scss'

import React, {useContext, useEffect, useState} from 'react';
import PageSelector from "../../components/PageSelector/PageSelector";
import Button from "../../components/Button"
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import {$host} from "../../http";
import {useHistory} from 'react-router-dom'
import {Context} from "../../index";
import {PROFILE_ROUTE} from "../../utils/constants";
import {observer} from "mobx-react-lite";
import {alertError} from "../../utils/utils";

const getTournaments = async (page, size = 2) => {
    return await $host.get(
        '/tournaments', {
            params: {
                projection: 'bracketType',
                sort: ['createdDate', 'desc'].join(','),
                page: page,
                size: size
            }
        }
    )
        .then((response) => response.data)
        .catch((e) => alertError(e))
}

const Main = observer(() => {
    const history = useHistory()
    const {userStore, signUpModal} = useContext(Context)
    const [state, setState] = useState({tournaments: [], currentPage: 0, lastPage: 0})
    
    const updateTournamentPage = (page) => {
        getTournaments(page).then((data) => {
            setState({
                tournaments: data?._embedded.tournaments.map((t) => {
                    t.date = t.createdDate
                    return t
                }) || [],
                currentPage: page,
                lastPage: (data?.page.totalPages - 1) || 0
            })
        })
    }

    useEffect(() => {
        updateTournamentPage(0)
    }, [])

    const nextPage = () => {
        if (state.currentPage < state.lastPage) {
            updateTournamentPage(state.currentPage + 1)
        }
    }

    const prevPage = () => {
        if (state.currentPage > 0) {
            updateTournamentPage(state.currentPage - 1)
        }
    }

    const handleTryButton = () => {
        if (userStore.isAuth) {
            history.push(PROFILE_ROUTE)
        } else {
            signUpModal.openModal()
        }
    }

    return (
        <div>
            <section className="section-header">
                <div className="container">
                    <div className="content">
                        <h1>Генератор турнирных сеток и таблиц</h1>
                        <Button class="black main" onClick={handleTryButton}>Попробовать</Button>
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
                            <TournamentsStaticTable tournaments={state.tournaments}/>
                            <PageSelector page={state.currentPage + 1} onPrevPage={prevPage} onNextPage={nextPage}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
});

export default Main;
import './main.scss'

import React, {useContext, useEffect, useState} from 'react';
import PageSelector from "../../components/PageSelector/PageSelector";
import Button from "../../components/Button"
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import {useHistory} from 'react-router-dom'
import {Context} from "../../index";
import {PROFILE_ROUTE} from "../../utils/constants";
import {observer} from "mobx-react-lite";
import {fetchTournamentsPage} from "../../http/public";


const Main = observer(() => {
    const history = useHistory()
    const {userStore, signUpModal} = useContext(Context)
    const [state, setState] = useState({tournaments: [], currentPage: 0, lastPage: 0})
    let loading = false
    
    const updateTournamentsPage = (page) => {
        loading = true
        fetchTournamentsPage(page).then((data) => {
            setState({
                tournaments: data?._embedded.tournaments.map((t) => {
                    t.date = t.createdDate
                    return t
                }) || [],
                currentPage: page,
                lastPage: (data?.page.totalPages - 1) || 0
            })
            loading = false
        })
    }

    useEffect(() => {
        updateTournamentsPage(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const nextPage = () => {
        if (state.currentPage < state.lastPage && !loading) {
            updateTournamentsPage(state.currentPage + 1)
        }
    }

    const prevPage = () => {
        if (state.currentPage > 0 && !loading) {
            updateTournamentsPage(state.currentPage - 1)
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
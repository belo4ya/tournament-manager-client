import './main.scss'

import React, {useContext} from 'react';
import PageSelector from "../../components/PageSelector/PageSelector";
import Button from "../../components/Button"
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import {useHistory} from 'react-router-dom'
import {PROFILE_ROUTE} from "../../utils/constants";
import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";


const Main = () => {
    const history = useHistory()
    const {userStore, tournamentStore, modalStore} = useStore()

    const onNextPage = () => {
        tournamentStore.onNextPage()
    }

    const onPrevPage = () => {
        tournamentStore.onPrevPage()
    }

    const handleTryButton = () => {
        if (userStore.isAuth) {
            history.push(PROFILE_ROUTE)
        } else {
            modalStore.modalPages.signUp.open()
        }
    }

    console.log('main')
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
                            <TournamentsStaticTable tournaments={tournamentStore.tournaments}/>
                            <PageSelector page={tournamentStore.page.number + 1} onPrevPage={onPrevPage} onNextPage={onNextPage}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default observer(Main);
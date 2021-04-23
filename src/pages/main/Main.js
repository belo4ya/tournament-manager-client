import './main.scss'

import React, {useState} from 'react';
import SignInModalForm from "../../components/SignInModalForm/SignInModalForm";
import SignUpModalForm from "../../components/SignUpModalForm/SignUpModalForm";
import PageSelector from "../../shared/PageSelector";
import Button from "../../components/Button"
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";

const Main = () => {
    const mock = [
        {
            id: 0,
            image: '',
            title: 'BLAST Premier Spring Showdown 2021',
            subtitle: 'Single Elimination',
            teams: '16',
            date: '23:11 16/04/2021'
        },
        {
            id: 1,
            image: '',
            title: 'BLAST Premier Spring Showdown 2021',
            subtitle: 'Single Elimination',
            teams: '16',
            date: '23:11 16/04/2021'
        },
        {
            id: 2,
            image: '',
            title: 'BLAST Premier Spring Showdown 2021',
            subtitle: 'Single Elimination',
            teams: '16',
            date: '23:11 16/04/2021'
        },
        {
            id: 3,
            image: '',
            title: 'BLAST Premier Spring Showdown 2021',
            subtitle: 'Single Elimination',
            teams: '16',
            date: '23:11 16/04/2021'
        },
        {
            id: 4,
            image: '',
            title: 'BLAST Premier Spring Showdown 2021',
            subtitle: 'Single Elimination',
            teams: '16',
            date: '23:11 16/04/2021'
        }
    ]
    const [tournaments, setTournaments] = useState(mock)

    const [page, setPage] = useState(1)
    const nextPage = () => {
        setPage(page + 1)
    }
    const prevPage = () => {
        if (page > 1) setPage(page - 1)
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
                            <PageSelector page={page} onPrevPage={prevPage} onNextPage={nextPage}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Main;
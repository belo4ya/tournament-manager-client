import './tournaments.scss'

import React, {useState} from 'react';
import PageSelector from "../PageSelector/PageSelector";
import Button from "../Button";
import EditableTournamentItem from "./EditableTournamentItem";
import {observer} from "mobx-react-lite";
import AlertBody from "../Alert/AlertBody";
import {alertWarning, compare, toDate} from "../../utils/utils";
import useStore from "../../hooks/useStore";
import {useHistory} from "react-router-dom";

const TournamentsDynamicTable = (props) => {
    const history = useHistory()
    const {modalStore} = useStore()
    const [filters, setFilters] = useState({
        nameFilter: {
            state: 0,
            priority: 0,
            comparator: (a, b, reverse) => compare(a.name.toLowerCase(), b.name.toLowerCase(), reverse)
        },
        teamsFilter: {
            state: 0,
            priority: 0,
            comparator: (a, b, reverse) => compare(a.totalTeams, b.totalTeams, reverse)
        },
        createdDateFilter: {
            state: 1,
            priority: 1,
            comparator: (a, b, reverse) => compare(toDate(a.date), toDate(b.date), reverse)
        }
    })

    const handleNameFilter = () => {
        const [nameFilter, otherFilters] = managePriority(filters.nameFilter, [filters.teamsFilter, filters.createdDateFilter])
        const [teamsFilter, createdDateFilter] = otherFilters

        setFilters({nameFilter, teamsFilter, createdDateFilter})
    }

    const handleTeamsFilter = () => {
        const [teamsFilter, otherFilters] = managePriority(filters.teamsFilter, [filters.nameFilter, filters.createdDateFilter])
        const [nameFilter, createdDateFilter] = otherFilters

        setFilters({nameFilter, teamsFilter, createdDateFilter})
    }

    const handleCreatedDateFilter = () => {
        const [createdDateFilter, otherFilters] = managePriority(filters.createdDateFilter, [filters.nameFilter, filters.teamsFilter])
        const [nameFilter, teamsFilter] = otherFilters

        setFilters({nameFilter, teamsFilter, createdDateFilter})
    }

    const handleDeleteButton = (event, tournament) => {
        alertWarning(
            <AlertBody
                header="Предупреждение"
                handleClose={() => modalStore.alert.close()}
                content={`Вы действительно хотите удалить ${tournament.name}?`}
                actions={{ok: {text: "Удалить", action: () => false}, cancel: {text: "Отмена", action: () => false}}}
            />
        )
    }

    return (
        <div className="tournaments-table">
            <div
                className="head"
                onMouseDown={(event) => {
                    event.preventDefault()
                }}
                onDoubleClick={(event) => {
                    event.preventDefault()
                }}
            >
                <div className="kludge"/>
                <div
                    className={arrowPos[filters.nameFilter.state]}
                    onClick={handleNameFilter}
                >
                    Название
                    <div className="filter-arrow">▼</div>
                </div>
                <div
                    className={arrowPos[filters.teamsFilter.state]}
                    onClick={handleTeamsFilter}
                >
                    Команды
                    <div className="filter-arrow">▼</div>
                </div>
                <div
                    className={arrowPos[filters.createdDateFilter.state]}
                    onClick={handleCreatedDateFilter}
                >
                    Дата создания
                    <div className="filter-arrow">▼</div>
                </div>
                <div className="kludge"/>
                <div className="head-item bold">Действие</div>
            </div>
            <div className="content">
                {sortWithPriority(props.tournaments, [filters.nameFilter, filters.teamsFilter, filters.createdDateFilter])
                    .map((t) => {
                        return (
                            <EditableTournamentItem
                                key={t.id}
                                id={t.id}
                                name={t.name}
                                logo={t.logo}
                                bracketType={t.bracketType}
                                totalTeams={t.totalTeams}
                                date={t.date}
                                onEdit={() => t.onClick(history)}
                                onDelete={(event) => handleDeleteButton(event, t)}
                            />
                        );
                    })}
            </div>
            <div className="actions">
                <PageSelector
                    page={props.page + 1}
                    onPrevPage={props.prevPage}
                    onNextPage={props.nextPage}
                />
                <Button class="red">Создать турнир</Button>
            </div>
        </div>
    );
};

export default observer(TournamentsDynamicTable);


const managePriority = (target, context: Array) => {
    target.state = next(target.state)

    if (target.state === 1) {
        target.priority = Math.max(...context.map(el => el.priority)) + 1
    } else if (target.state === 0) {
        context.forEach(el => {
            if (el.priority > target.priority) {
                el.priority -= 1
            }
        })
        target.priority = 0
    }

    return [target, context]
}

const sortWithPriority = (target, filters) => {
    filters = filters.filter((f) => f.state !== 0).sort((a, b) => compare(a.priority, b.priority))
    if (filters) {
        return target.slice().sort((a, b) => {
            // return filters.map((f) => f.comparator(a, b, f.state === 1)).reduce((a, b) => a || b, 0)
            return (
                filters[0]?.comparator(a, b, filters[0].state === 1) ||
                filters[1]?.comparator(a, b, filters[1].state === 1) ||
                filters[2]?.comparator(a, b, filters[2].state === 1)
            )
        })
    }
    return target
}

const next = (value) => {
    return (value + 1) % 3
}

const arrowPos = {
    0: 'head-item',
    1: 'head-item filter',
    2: 'head-item filter up',
}

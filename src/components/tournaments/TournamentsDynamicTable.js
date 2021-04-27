import './tournaments.scss'

import React from 'react';
import PageSelector from "../PageSelector/PageSelector";
import Button from "../Button";
import EditableTournamentItem from "./EditableTournamentItem";


const toDate = (value) => {
    let [time, date] = value.split(' ')
    time = time.split(':')
    date = date.split('/')
    return new Date(date[2], date[1], date[0], time[0], time[1])
}


class TournamentsDynamicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: {state: 0, priority: 0, _name: 'nameFilter'},
            teamsFilter: {state: 0, priority: 0, _name: 'teamsFilter'},
            createdDateFilter: {state: 2, priority: 1, _name: 'createdDateFilter'}
        }
        this.arrowPos = {
            0: 'head-item',
            1: 'head-item filter',
            2: 'head-item filter up',
        }
    }

    handleNameFilter = () => {
        const [nameFilter, otherFilters] = this._manage_priority(this.state.nameFilter, [this.state.teamsFilter, this.state.createdDateFilter])
        const [teamsFilter, createdDateFilter] = otherFilters

        this.setState({nameFilter, teamsFilter, createdDateFilter})
    }

    handleTeamsFilter = () => {
        const [teamsFilter, otherFilters] = this._manage_priority(this.state.teamsFilter, [this.state.nameFilter, this.state.createdDateFilter])
        const [nameFilter, createdDateFilter] = otherFilters

        this.setState({nameFilter, teamsFilter, createdDateFilter})
    }

    handleCreatedDateFilter = () => {
        const [createdDateFilter, otherFilters] = this._manage_priority(this.state.createdDateFilter, [this.state.nameFilter, this.state.teamsFilter])
        const [nameFilter, teamsFilter] = otherFilters

        this.setState({nameFilter, teamsFilter, createdDateFilter})
    }

    handleEditButton = (event, id) => {
        console.log('edit: ', id)
    }

    handleDeleteButton = (event, id) => {
        console.log('delete', id)
    }

    render() {
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
                        className={this.arrowPos[this.state.nameFilter.state]}
                        onClick={this.handleNameFilter}
                    >
                        Название
                        <div className="filter-arrow">▼</div>
                    </div>
                    <div
                        className={this.arrowPos[this.state.teamsFilter.state]}
                        onClick={this.handleTeamsFilter}
                    >
                        Команды
                        <div className="filter-arrow">▼</div>
                    </div>
                    <div
                        className={this.arrowPos[this.state.createdDateFilter.state]}
                        onClick={this.handleCreatedDateFilter}
                    >
                        Дата создания
                        <div className="filter-arrow">▼</div>
                    </div>
                    <div className="kludge"/>
                    <div className="head-item bold">Действие</div>
                </div>
                <div className="content">
                    {this._sort_with_priority(this.props.tournaments, [this.state.nameFilter, this.state.teamsFilter, this.state.createdDateFilter])
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
                                    onEdit={(event) => this.handleEditButton(event, t.id)}
                                    onDelete={(event) => this.handleDeleteButton(event, t.id)}
                                />
                            );
                        })}
                </div>
                <div className="actions">
                    <PageSelector
                        page={this.props.page + 1}
                        onPrevPage={this.props.prevPage}
                        onNextPage={this.props.nextPage}
                    />
                    <Button class="red">Создать турнир</Button>
                </div>
            </div>
        );
    }

    _manage_priority = (target, context: Array) => {
        target.state = this._next(target.state)

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

    /*
    * TODO: Пока не работает как надо
    * */
    _sort_with_priority(target, filters) {
        filters = filters.filter((f) => f.state !== 0).sort((a, b) => {
            if (a.priority < b.priority) return 1
            if (a.priority > b.priority) return -1
            return 0
        })

        return target.sort((a, b) => {
            if (filters[0]?._name === 'nameFilter') {
                const comparison = this._compare(a.name, b.name, filters[0].state === 2 ? 1 : -1)
                if (comparison) return comparison
            } else if (filters[1]?._name === 'teamsFilter') {
                const comparison = this._compare(a.totalTeams, b.totalTeams, filters[1].state === 2 ? 1 : -1)
                if (comparison) return comparison
            } else if (filters[2]?._name === 'createdDateFilter') {
                const comparison = this._compare(toDate(a.createdDate), toDate(b.createdDate), filters[2].state === 2 ? 1 : -1)
                if (comparison) return comparison
            }

            return 0
        })
    }

    _compare = (a, b, predicate) => {
        if (a > b) return predicate
        if (a < b) return -predicate
        return 0
    }

    _next = (value) => {
        return (value + 1) % 3
    }
}

export default TournamentsDynamicTable;
import "./tournament-creation.scss"

import React, {useEffect, useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Button from "../../components/Button";
import Input from "../../components/Input/Input";
import Select from "react-select";
import ChoiceBoxList from "../../components/Checkbox/ChoiceBoxList";
import {fetchAllTeams, fetchTournamentTypes} from "../../http/authorized";
import {alertMessage} from "../../utils/utils";


const TournamentCreation = () => {
    const [name, setName] = useState('')
    const [format, setFormat] = useState([])
    const [seed, setSeed] = useState({
        random: {id: 'random', value: 'Случайный', checked: true},
        rating: {id: 'rating', value: 'По рейтингу', checked: false},
        fifo: {id: 'fifo', value: 'В порядке добавления', checked: false}
    })
    const [participants, setParticipants] = useState([])
    const [teams, setTeams] = useState([])

    const handleNameInput = (event) => {
        if (event.target.value.length < 64) {
            setName(event.target.value)
        }
    }

    const handleFormatChoice = (event) => {
        setFormat(Object.keys(format).reduce((a, b) => ({
            ...a, [b]: {...format[b], checked: event.target.name === b}
        }), {}))
    }

    const handleSeedChoice = (event) => {
        setSeed(Object.keys(seed).reduce((a, b) => ({
            ...a, [b]: {...seed[b], checked: event.target.name === b}
        }), {}))
    }

    const handleSelectInput = (selected) => {
        setParticipants(selected)
    }

    const handleCreateButton = () => {
        if (isValidTournamentName(name) && isValidParticipantsNumber(participants)) {
            console.log('create')
        } else {
            let message = ''
            message += !isValidTournamentName(name) ? 'Минимальная длина названия турнира 5 символов. ' : ''
            message += !isValidParticipantsNumber(participants)? 'Минимальное количество участников 4.' : ''
            alertMessage('Ошибка', message)
        }
    }

    useEffect(() => {
        fetchTournamentTypes().then((bracketTypes) => {
            setFormat(bracketTypes.reduce((a, b, i) => ({
                ...a,
                [b.type]: {id: b.id, value: b.type, checked: i === 0},
            }), {}))
        })
        fetchAllTeams().then((teams) => {
            setTeams(teams.map((t) => {
                return {
                    value: t.id,
                    label: `#${t.rating} | ${t.name}`
                }
            }))
        })
    }, [])

    return (
        <div>
            <div className="container">
                <OnPageNavigation/>
                <div className="input-section">
                    <h2>Создание турнира</h2>
                    <div className="name input-subsection">
                        <h5>Название</h5>
                        <Input
                            value={name}
                            onChange={handleNameInput}
                            inputStyle={isValidTournamentName(name) ? 'input-secondary' : 'input-danger'}
                            placeholder="Awesome Tournament 2024..."
                        />
                    </div>
                    <div className="logo-input input-subsection">
                        <h5>Логотип</h5>
                        <Input placeholder="https://img-cdn..." disabled={true}/>
                    </div>
                    <div className="format input-subsection">
                        <h5>Формат</h5>
                        <div className="choice-box-list">
                            <ChoiceBoxList choiceBoxList={format} onChange={handleFormatChoice}/>
                        </div>
                    </div>
                    <div className="seeding input-subsection">
                        <h5>Посев</h5>
                        <ChoiceBoxList choiceBoxList={seed} onChange={handleSeedChoice}/>
                    </div>
                    <div className="participants input-subsection">
                        <h5>Участники</h5>
                        <h5
                            className={isValidParticipantsNumber(participants) ? 'participants-number' : 'participants-number danger'}
                        >
                            ({participants.length})
                        </h5>
                        <div className="select-input">
                            <Select
                                options={teams}
                                onChange={handleSelectInput}
                                maxMenuHeight={200}
                                isMulti={true}
                                closeMenuOnSelect={false}
                                name="teams"
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                    <Button class="red input-subsection" onClick={handleCreateButton}>Создать</Button>
                </div>
            </div>
        </div>
    );
};

export default TournamentCreation;


const isValidTournamentName = (name) => {
    return name.length > 4 && name.length < 64
}

const isValidParticipantsNumber = (participants) => {
    return participants.length > 3 && participants.length < 65
}
import "./tournament-creation.scss"

import React from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Button from "../../components/Button";
import Input from "../../components/Input/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import Select from "react-select";


const TournamentCreation = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'vanilla 1', label: 'Vanilla 1' },
        { value: 'vanilla 2', label: 'Vanilla 2' },
        { value: 'vanilla 3', label: 'Vanilla 3' },
        { value: 'vanilla 4', label: 'Vanilla 4' },
        { value: 'vanilla 5', label: 'Vanilla 5' },
        { value: 'vanilla 6', label: 'Vanilla 6' },
        { value: 'vanilla 7', label: 'Vanilla 7' },
    ]

    return (
        <div>
            <div className="container">
                <OnPageNavigation/>
                <div className="input-section">
                    <h2>Создание турнира</h2>
                    <div className="name input-subsection">
                        <h5>Название</h5>
                        <Input/>
                    </div>
                    <div className="logo-input input-subsection">
                        <h5>Логотип</h5>
                        <Input disabled={true}/>
                    </div>
                    <div className="format input-subsection">
                        <h5>Формат</h5>
                        <div className="choice-box-list">
                            <Checkbox value="Single Elimination"/>
                            <Checkbox value="Single Elimination"/>
                            <Checkbox value="Single Elimination"/>
                        </div>
                    </div>
                    <div className="seeding input-subsection">
                        <h5>Посев</h5>
                        <div className="choice-box-list">
                            <Checkbox value="Случайный"/>
                            <Checkbox value="Случайный"/>
                            <Checkbox value="Случайный"/>
                        </div>
                    </div>
                    <div className="participants input-subsection">
                        <h5>Участники</h5>
                        <div className="select-input">
                            <Select
                                maxMenuHeight={200}
                                isMulti={true}
                                closeMenuOnSelect={false}
                                name="colors"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                    <Button class="red input-subsection">Создать</Button>
                </div>
            </div>
        </div>
    );
};

export default TournamentCreation;
import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import Modal from "../../components/Modal/Modal";
import TeamForm from "../../components/Form/TeamForm";
import apiCall from "../../http/api";

const TeamCreation = () => {
    const {modalStore} = useStore()
    const teamCreation = modalStore.modalPages.teamCreation
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)

    const handleClose = () => {
        setName('')
        setRating(0)
        teamCreation.close()
    }

    const handleSubmit = () => {
        if (isValidRating(rating) && isValidName(name)) {
            apiCall.createTeam(name, rating).then((data) => {
                if (data) {
                    handleClose()
                } else {
                    setName('')
                }
            })
        }
    }

    const handleNameInput = (event) => {
        const value = event.target.value
        if (value.length < 64) {
            setName(value)
        }
    }

    const handleRatingInput = (event) => {
        const value = parseInt(event.target.value.replace(/\D/, ''))
        if (isValidRating(value)) {
            setRating(value || 0)
        }
    }

    return (
        <Modal
            onRequestClose={handleClose}
            isOpen={teamCreation.isOpen}
        >
            <TeamForm
                title="СОЗДАНИЕ КОМАНДЫ"
                action="СОЗДАТЬ"
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                fields={[
                    {
                        label: "Название",
                        inputStyle: isValidName(name) ? 'input-secondary' : 'input-danger',
                        type: "text",
                        placeholder: "favorite team",
                        id: "title",
                        value: name,
                        onChange: handleNameInput,
                    },
                    {
                        label: "Очки рейтинга",
                        inputStyle: isValidRating(rating) ? 'input-secondary' : 'input-danger',
                        type: "text",
                        placeholder: "1551",
                        id: "rating",
                        value: rating,
                        onChange: handleRatingInput,
                    },
                ]}
                image={{label: "Логотип", id: "logo"}}
            />
        </Modal>
    );
};

export default observer(TeamCreation);


const isValidName = (name) => {
    return name.length > 3 && name.length < 64
}

const isValidRating = (rating) => {
    return isNaN(rating) || (rating >= 0 && rating <= 10000)
}
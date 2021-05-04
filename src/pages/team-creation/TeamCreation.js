import React from 'react';
import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import Modal from "../../components/Modal/Modal";
import TeamForm from "../../components/Form/TeamForm";

const TeamCreation = () => {
    const {modalStore} = useStore()
    const teamCreation = modalStore.modalPages.teamCreation

    const handleClose = () => {
        teamCreation.close()
    }

    const handleSubmit = () => {
        console.log('создать')
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
                        type: "text",
                        placeholder: "favorite team",
                        id: "title",
                    },
                    {
                        label: "Очки рейтинга",
                        type: "text",
                        placeholder: "1551",
                        id: "rating",
                    },
                ]}
                image={{label: "Логотип", id: "logo"}}
            />
        </Modal>
    );
};

export default observer(TeamCreation);
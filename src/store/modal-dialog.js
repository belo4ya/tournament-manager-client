import {makeAutoObservable} from "mobx";

export default class ModalDialog {

    constructor() {
        this._isOpen = false
        makeAutoObservable(this)
    }

    openModal() {
        this.isOpen = true
    }

    closeModal() {
        this.isOpen = false
    }

    get isOpen() {
        return this._isOpen;
    }

    set isOpen(value) {
        this._isOpen = value;
    }
}
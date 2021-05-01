import {makeAutoObservable} from "mobx";

export default class AlertStore {

    constructor() {
        this._isOpen = false
        this._body = null
        makeAutoObservable(this)
    }

    showAlert(body) {
        this._body = body
        this._isOpen = true
    }

    closeAlert() {
        this._isOpen = false
        this._body = null
    }

    get isOpen() {
        return this._isOpen;
    }

    set isOpen(value) {
        this._isOpen = value;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }
}
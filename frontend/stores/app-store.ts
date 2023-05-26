import {makeAutoObservable} from 'mobx';
import {ContactStore} from "Frontend/stores/contact-store";
import {UiStore} from "Frontend/stores/ui-store";
import {EventStore} from "Frontend/stores/event-store";

export class AppStore {

    contactStore = new ContactStore();

    eventStore = new EventStore();

    uiStore = new UiStore();

    constructor() {
        makeAutoObservable(this);
    }
}

export const appStore = new AppStore();
export const contactStore = appStore.contactStore;
export const uiStore = appStore.uiStore;
export const eventStore = appStore.eventStore;
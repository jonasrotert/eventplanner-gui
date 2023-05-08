import {makeAutoObservable, observable, runInAction} from 'mobx';

import {ContactEndpoint} from 'Frontend/generated/endpoints';
import ContactDTO from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/ContactDTO";
import {uiStore} from "Frontend/stores/app-store";


export class ContactStore {
    contacts: ContactDTO[] = [];

    constructor() {
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                contacts: observable.shallow
            },
            {autoBind: true}
        );

        this.initFromServer();
    }

    async initFromServer() {
        const data = await ContactEndpoint.getAllContact();

        runInAction(() => {
            this.contacts = data;
        });
    }

    async saveContact(contact: ContactDTO) {
        try {
            const saved = await ContactEndpoint.saveContact(contact);
            if (saved) {
                this.saveLocal(saved);
                console.log("Contact saved.");
                uiStore.showSuccess('Contact saved.');
            } else {
                console.log('Contact save failed');
                uiStore.showSuccess('Contact saved.');
            }
        } catch (e) {
            console.log('Contact save failed');
            uiStore.showError('Contact save failed.');
        }
    }

    async deleteContact(contact: ContactDTO) {
        if (!contact.id) return;

        try {
            await ContactEndpoint.deleteContact(contact.id);
            this.deleteLocal(contact);
            uiStore.showSuccess('Deleted contact.');
        } catch (e) {
            uiStore.showError('Failed to delete contact.');
            console.log('Contact delete failed');
        }
    }

    private saveLocal(saved: ContactDTO) {
        const contactExists = this.contacts.some((c) => c.id === saved.id);
        if (contactExists) {
            this.contacts = this.contacts.map((existing) => {
                if (existing.id === saved.id) {
                    return saved;
                } else {
                    return existing;
                }
            });
        } else {
            this.contacts.push(saved);
        }
    }

    private deleteLocal(contact: ContactDTO) {
        this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    }

}
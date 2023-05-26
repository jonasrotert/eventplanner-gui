import {makeAutoObservable, observable, runInAction} from 'mobx';

import {EventEndpoint} from 'Frontend/generated/endpoints';
import {uiStore} from "Frontend/stores/app-store";
import EventDTO from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/booking/EventDTO";


export class EventStore {
    events: EventDTO[] = [];

    constructor() {
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                events: observable.shallow
            },
            {autoBind: true}
        );

        this.initFromServer();
    }

    async initFromServer() {
        const data = await EventEndpoint.getAllEvent();

        runInAction(() => {
            this.events = data;
        });
    }

    async saveEvent(event: EventDTO) {
        try {
            const saved = await EventEndpoint.saveEvent(event);
            if (saved) {
                this.saveLocal(saved);
                console.log("Event saved.");
                uiStore.showSuccess('Event saved.');
            } else {
                console.log('Event save failed');
                uiStore.showSuccess('Event saved.');
            }
        } catch (e) {
            console.log('Event save failed');
            uiStore.showError('Event save failed.');
        }
    }

    async deleteEvent(event: EventDTO) {
        if (!event.id) return;

        try {
            await EventEndpoint.deleteEvent(event.id);
            this.deleteLocal(event);
            uiStore.showSuccess('Deleted event.');
        } catch (e) {
            uiStore.showError('Failed to delete event.');
            console.log('Event delete failed');
        }
    }

    private saveLocal(saved: EventDTO) {
        const eventExists = this.events.some((c) => c.id === saved.id);
        if (eventExists) {
            this.events = this.events.map((existing) => {
                if (existing.id === saved.id) {
                    return saved;
                } else {
                    return existing;
                }
            });
        } else {
            this.events.push(saved);
        }
    }

    private deleteLocal(event: EventDTO) {
        this.events = this.events.filter((c) => c.id !== event.id);
    }

}
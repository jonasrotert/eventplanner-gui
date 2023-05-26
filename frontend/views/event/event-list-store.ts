import {makeAutoObservable, observable} from "mobx";
import {eventStore} from "Frontend/stores/app-store";
import EventDTO from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/booking/EventDTO";
import EventDTOModel from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/booking/EventDTOModel";

class EventListStore {
    filterText = '';
    selectedEvent: EventDTO | null = null;

    constructor() {
        makeAutoObservable(
            this,
            {selectedEvent: observable.ref},
            {autoBind: true}
        );
    }

    editNew() {
        this.selectedEvent = EventDTOModel.createEmptyValue();
    }

    cancelEdit() {
        this.selectedEvent = null;
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    setSelectedEvent(event: EventDTO) {
        this.selectedEvent = event;
    }

    get filteredEvents() {
        const filter = new RegExp(this.filterText, 'i');
        const events = eventStore.events;
        return events.filter((event) =>
            filter.test(`${event.title} ${event.description} ${event.intro}`)
        );
    }

    async save(event: EventDTO) {
        await eventStore.saveEvent(event);
        this.cancelEdit();
    }

    async delete() {
        if (this.selectedEvent) {
            await eventStore.deleteEvent(this.selectedEvent);
            this.cancelEdit();
        }
    }
}

export const eventListStore = new EventListStore();
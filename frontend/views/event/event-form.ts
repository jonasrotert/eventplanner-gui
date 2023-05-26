import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from 'Frontend/views/view';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/text-field';
import '@vaadin/date-picker';
import {Binder, field} from "@hilla/form";
import {eventListStore} from "Frontend/views/event/event-list-store";
import EventDTOModel from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/booking/EventDTOModel";

@customElement('event-form')
export class EventForm extends View {

    protected binder = new Binder(this, EventDTOModel);

    constructor() {
        super();
        this.autorun(() => {
            if (eventListStore.selectedEvent) {
                this.binder.read(eventListStore.selectedEvent);
            } else {
                this.binder.clear();
            }
        });
    }

    async save() {
        await this.binder.submitTo(eventListStore.save);
        this.binder.clear();
    }

    render() {
        const {model} = this.binder;

        return html`

            <vaadin-text-field label="Title" ${field(model.title)}></vaadin-text-field>
            <vaadin-text-field label="Description" ${field(model.description)}></vaadin-text-field>
            <vaadin-date-picker ${field(model.startDate)} label="Start date"></vaadin-date-picker>
            <vaadin-date-picker ${field(model.endDate)} label="End date"></vaadin-date-picker>

            <div class="flex gap-s">
                <vaadin-button theme="primary" @click=${this.save}> ${this.binder.value.id ? 'Update' : 'Create'}</vaadin-button>
                <vaadin-button theme="error" @click=${eventListStore.delete}> Delete</vaadin-button>
                <vaadin-button theme="tertiary" @click=${eventListStore.cancelEdit}>Cancel</vaadin-button>
                
            </div>
        `;
    }
}
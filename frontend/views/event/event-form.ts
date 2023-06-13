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
import '@vaadin/vertical-layout';
import '@vaadin/tabs';
import '@vaadin/tabsheet';
import '@vaadin/text-area';
import '@vaadin/checkbox';
import '@vaadin/date-time-picker';

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

            <vaadin-vertical-layout style="align-items: stretch;">
                <vaadin-tabsheet>
                    <vaadin-tabs slot="tabs">
                        <vaadin-tab id="dashboard-tab">Basic information</vaadin-tab>
                        <vaadin-tab id="payment-tab">Location</vaadin-tab>
                        <vaadin-tab id="shipping-tab">Booking</vaadin-tab>
                    </vaadin-tabs>
                    <div tab="dashboard-tab">
                        <vaadin-vertical-layout style="align-items: stretch;">
                            <vaadin-text-field label="Title" ${field(model.title)}></vaadin-text-field>
                            <vaadin-text-area label="Description" ${field(model.description)}></vaadin-text-area>
                            <vaadin-date-picker ${field(model.startDate)} label="Start date"></vaadin-date-picker>
                            <vaadin-date-picker ${field(model.endDate)} label="End date"></vaadin-date-picker>
                        </vaadin-vertical-layout>
                    </div>
                    <div tab="payment-tab">
                        <vaadin-vertical-layout style="align-items: stretch;">
                            <vaadin-text-field label="Description of the location" ${field(model.address.description)}></vaadin-text-field>
                            <vaadin-text-field label="Street" ${field(model.address.street)}></vaadin-text-field>
                        </vaadin-vertical-layout>
                        <vaadin-text-field label="Postal code" ${field(model.address.postalCode)}></vaadin-text-field>
                        <vaadin-text-field label="Village" ${field(model.address.village)}></vaadin-text-field>
                        <vaadin-vertical-layout style="align-items: stretch;">
                            <vaadin-text-field label="Country" ${field(model.address.country)}></vaadin-text-field>
                        </vaadin-vertical-layout>
                    </div>
                    <div tab="shipping-tab">
                        <vaadin-vertical-layout style="align-items: stretch;">
                            <vaadin-text-field label="Maximum capacity" ${field(model.capacityConfiguration.maximumCapacity)}></vaadin-text-field>
                            <vaadin-checkbox label="Queue if maximum capacity exceeds" ${field(model.capacityConfiguration.queueIfMaximimumCapacityExceeds)}></vaadin-checkbox>
                            <vaadin-date-time-picker label="Bookings expected due to ..." ${field(model.deadlineConfiguration.deadline)}></vaadin-date-time-picker>
                            <vaadin-checkbox label="Queue if deadline exceeded" ${field(model.deadlineConfiguration.queueIfDeadlineExceeds)}></vaadin-checkbox>
                        </vaadin-vertical-layout>
                    </div>
                </vaadin-tabsheet>

                <hr/>
                <div class="flex gap-s py-s px-m">
                    <vaadin-button theme="primary" @click=${this.save}> ${this.binder.value.id ? 'Update' : 'Create'}</vaadin-button>
                    <vaadin-button theme="tertiary" @click=${eventListStore.cancelEdit}>Cancel</vaadin-button>
                </div>
            </vaadin-vertical-layout>
        `;
    }
}
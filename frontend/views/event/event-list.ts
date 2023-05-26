import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from '../view';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import './event-form';
import './create-event-dialog';
import {uiStore} from "Frontend/stores/app-store";
import '@vaadin/notification';
import {eventListStore} from "Frontend/views/event/event-list-store";
import {columnBodyRenderer, GridColumnBodyLitRenderer} from "@vaadin/grid/lit";
import EventDTO from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/booking/EventDTO";
import {DialogOpenedChangedEvent} from "@vaadin/dialog";


@customElement('event-list')
export class EventList extends View {

    firstSelectionEvent = true;

    handleGridSelection(e: CustomEvent) {
        if (this.firstSelectionEvent) {
            this.firstSelectionEvent = false;
            return;
        }
        eventListStore.setSelectedEvent(e.detail.value);
    }

    updateFilter(e: { target: HTMLInputElement }) {
        eventListStore.updateFilter(e.target.value);
    }

    @state()
    private openDialog = false;

    private editNew() {
        console.log("Button clicked");
        this.openDialog = true;
        eventListStore.editNew();
    }

    private closeDialog(e: Event) {
        console.log("fired");
        this.openDialog = false;
    }

    render() {
        return html`

            <create-event-dialog @dialogOpened-changed="${this.closeDialog}" .dialogOpened="${this.openDialog}"></create-event-dialog>
            <div class="toolbar flex gap-s">

                <vaadin-text-field placeholder="Filter by name" .value=${eventListStore.filterText} @input=${this.updateFilter} clear-button-visible></vaadin-text-field>
                <vaadin-button @click="${this.editNew}">Add Event</vaadin-button>
            </div>
            <div class="content flex gap-m h-full">
                <vaadin-grid class="grid h-full" .items=${eventListStore.filteredEvents} .selectedItems=${[eventListStore.selectedEvent]} @active-item-changed=${this.handleGridSelection}>
                    <vaadin-grid-column path="title" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="description" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="bookingsCount" auto-width></vaadin-grid-column>
                    <vaadin-grid-column header="Status" auto-width ${columnBodyRenderer(this.statusRenderer, [])}></vaadin-grid-column>
                </vaadin-grid>
                <event-form class="flex flex-col gap-s" ?hidden=${!eventListStore.selectedEvent}></event-form>
            </div>
            <vaadin-notification theme=${uiStore.message.error ? 'error' : 'contrast'} position="bottom-start" opened=${uiStore.message.open} .renderer=${(root: HTMLElement) => (root.textContent = uiStore.message.text)}></vaadin-notification>
        `;
    }

    private statusRenderer: GridColumnBodyLitRenderer<EventDTO> = ({state}) => html`
        <span theme="badge ${state === 'PUBLISHED' ? 'success' : 'error'}">${state}</span>
    `;

    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'box-border',
            'flex',
            'flex-col',
            'p-m',
            'gap-s',
            'w-full',
            'h-full'
        );

        this.autorun(() => {
            if (eventListStore.selectedEvent) {
                this.classList.add("editing");
            } else {
                this.classList.remove("editing");
            }
        });
    }
}

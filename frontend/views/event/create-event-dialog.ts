import {customElement, html, LitElement} from "lit-element";


import '@vaadin/checkbox';
import '@vaadin/combo-box';
import ContactDTO from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/ContactDTO";
import {dialogHeaderRenderer, dialogRenderer} from "@vaadin/dialog/lit.js";
import {DialogOpenedChangedEvent} from "@vaadin/dialog";
import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/email-field';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import '@vaadin/tabs';
import '@vaadin/tabsheet';
import {property, state} from "lit/decorators.js";
import {TemplateResult} from "lit";
import './event-form';

export interface MyEvent {
    label: string;
    date: string;
}

@customElement('create-event-dialog')
export class CreateEventDialog extends LitElement {

    @state()
    private contact?: ContactDTO;


    public open() {
        this.dialogOpened = true;
    }

    private close() {
        this.dialogOpened = false;
        this.fireEvent();
    }

    private fireEvent() {
        const event = new CustomEvent<MyEvent>("myClick", {
            detail: {
                label: "click",
                date: new Date().toISOString()
            }
        });

        this.dispatchEvent(event);
    }

    @property()
    dialogOpened = false;

    private openChanged(event: DialogOpenedChangedEvent) {
        this.dialogOpened = event.detail.value;
        if (!this.dialogOpened) {
            this.fireEvent();
        }
    }

    render(): TemplateResult {
        return html`
            <vaadin-dialog   theme="no-padding" header-title="Create Event" .opened="${this.dialogOpened}" @opened-changed="${this.openChanged}"
                           ${dialogHeaderRenderer(this.renderHeadder, [])}
                           ${dialogRenderer(this.renderDialog, this.contact)}
            ></vaadin-dialog>
        `;
    }

    private renderHeadder = () => html`
        <vaadin-button theme="tertiary" @click="${this.close}">
            <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
    `;

    private renderDialog = () => html`
        <vaadin-vertical-layout theme="spacing" style="width: 700px; max-width: 100%; align-items: stretch;" class="height-4xl">
            <event-form></event-form>
        </vaadin-vertical-layout>
    `;
}

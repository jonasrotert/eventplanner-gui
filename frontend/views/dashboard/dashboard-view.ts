import {html} from 'lit';

import {customElement, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {View} from 'Frontend/views/view';
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

@customElement('dashboard-view')
export class DashboardView extends View {
    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'items-center', 'pt-xl');
    }


    @state()
    private contact?: ContactDTO;


    private open() {
        console.log("Open");
        this.dialogOpened = true;
    }

    private close() {
        console.log("Close");
        this.dialogOpened = false;
    }

    @state()
    private dialogOpened = false;


    render() {
        return html`<h1>Dashboard view</h1>
        <vaadin-dialog header-title="User details" .opened="${this.dialogOpened}" @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this.dialogOpened = event.detail.value;
        }}"
                       ${dialogHeaderRenderer(
                               () => html`
                                   <vaadin-button theme="tertiary" @click="${this.close}">
                                       <vaadin-icon icon="lumo:cross"></vaadin-icon>
                                   </vaadin-button>
                               `,
                               []
                       )}
                       ${dialogRenderer(this.renderDialog, this.contact)}
        ></vaadin-dialog>
        <vaadin-accordion></vaadin-accordion>
        <vaadin-button @click="${this.open}">Show dialog</vaadin-button>
        <h1>Hallo?!?!</h1>
        `;
    }

    private renderDialog = () => html`
        <vaadin-vertical-layout theme="spacing" style="width: 300px; max-width: 100%; align-items: stretch;">
            <vaadin-vertical-layout style="align-items: stretch;">
                <vaadin-text-field label="Name" value="${`${this.contact?.firstName} ${this.contact?.lastName}`}" readonly style="padding-top: 0;"></vaadin-text-field>
                <vaadin-email-field label="Email" value="${ifDefined(this.contact?.email)}" readonly></vaadin-email-field>
            </vaadin-vertical-layout>
        </vaadin-vertical-layout>
    `;

}
import {html, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '@vaadin/checkbox';
import '@vaadin/combo-box';
import {ifDefined} from "lit/directives/if-defined";
import {state} from "lit/decorators";
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

@customElement('create-event-dialog')
export class CreateEventDialog extends LitElement {

    @state()
    private contact?: ContactDTO;


    public open() {
        console.log("Open");
        this.dialogOpened = true;
    }

    private close() {
        console.log("Close");
        this.dialogOpened = false;
        let closedEvent = new Event('closed');
        this.dispatchEvent(closedEvent);
    }

    @property()
    dialogOpened = false;

    render(): TemplateResult {
        return html`
            <vaadin-dialog header-title="User details" .opened="${this.dialogOpened}" @opened-changed="${(event: DialogOpenedChangedEvent) => {
                this.dialogOpened = event.detail.value;
                let closedEvent = new Event('closed');
                this.dispatchEvent(closedEvent);
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

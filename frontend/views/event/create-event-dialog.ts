import { LitElement, html, customElement, css } from "lit-element";
import {ifDefined} from "lit/directives/if-defined.js";

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
import {property, state} from "lit/decorators.js";
import {TemplateResult} from "lit";

export interface MyEvent {
    label: string;
    date: string;
}

@customElement('create-event-dialog')
export class CreateEventDialog extends LitElement {

    @state()
    private contact?: ContactDTO;


    public open() {
        console.log("Open");
        this.dialogOpened = true;
    }

    private close() {
        console.log("Close button clicked");
        this.dialogOpened = false;
        this.fireEvent();
    }

    private fireEvent() {
        console.log("Firing event");
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

    render(): TemplateResult {
        return html`
            <vaadin-dialog header-title="User details" .opened="${this.dialogOpened}"
                           @opened-changed="${(event: DialogOpenedChangedEvent) => {
                               console.log("Value change from " + this.dialogOpened + " to " + event.detail.value);
                               this.dialogOpened = event.detail.value;
                               if (!this.dialogOpened) {
                                   this.fireEvent();
                               }
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
                <vaadin-text-field label="Name" value="${`${this.contact?.firstName} ${this.contact?.lastName}`}"
                                   readonly style="padding-top: 0;"></vaadin-text-field>
                <vaadin-email-field label="Email" value="${ifDefined(this.contact?.email)}"
                                    readonly></vaadin-email-field>
            </vaadin-vertical-layout>
        </vaadin-vertical-layout>
    `;
}

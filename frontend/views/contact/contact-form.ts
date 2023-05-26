import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from 'Frontend/views/view';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/text-field';
import {Binder, field} from "@hilla/form";
import ContactDTOModel from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/ContactDTOModel";
import {contactListStore} from "Frontend/views/contact/contact-list-store";

@customElement('contact-form')
export class ContactForm extends View {

    protected binder = new Binder(this, ContactDTOModel);

    constructor() {
        super();
        this.autorun(() => {
            if (contactListStore.selectedContact) {
                this.binder.read(contactListStore.selectedContact);
            } else {
                this.binder.clear();
            }
        });
    }

    async save() {
        await this.binder.submitTo(contactListStore.save);
        this.binder.clear();
    }

    render() {
        const {model} = this.binder;

        return html`

            <vaadin-text-field label="First name" ${field(model.firstName)}></vaadin-text-field>
            <vaadin-text-field label="Last name" ${field(model.lastName)}></vaadin-text-field>
            <vaadin-text-field label="Email" ${field(model.email)}></vaadin-text-field>

            <div class="flex gap-s">
                <vaadin-button theme="primary" @click=${this.save}> ${this.binder.value.id ? 'Update' : 'Create'}</vaadin-button>
                <vaadin-button theme="error" @click=${contactListStore.delete}> Delete</vaadin-button>
                <vaadin-button theme="tertiary" @click=${contactListStore.cancelEdit}>Cancel</vaadin-button>
            </div>
        `;
    }
}
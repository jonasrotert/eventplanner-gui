import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from '../view';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import './contact-form';
import {contactListStore} from "Frontend/views/contact/contact-list-store";
import {uiStore} from "Frontend/stores/app-store";
import '@vaadin/notification';

@customElement('contact-list')
export class ContactList extends View {

    firstSelectionEvent = true;

    handleGridSelection(e: CustomEvent) {
        if (this.firstSelectionEvent) {
            this.firstSelectionEvent = false;
            return;
        }
        contactListStore.setSelectedContact(e.detail.value);
    }

    updateFilter(e: { target: HTMLInputElement }) {
        contactListStore.updateFilter(e.target.value);
    }

    render() {
        return html`
            <div class="toolbar flex gap-s">
                <vaadin-text-field placeholder="Filter by name" .value=${contactListStore.filterText} @input=${this.updateFilter} clear-button-visible></vaadin-text-field>
                <vaadin-button @click="${contactListStore.editNew}">Add Contact</vaadin-button>
            </div>
            <div class="content flex gap-m h-full">
                <vaadin-grid class="grid h-full" .items=${contactListStore.filteredContacts} .selectedItems=${[contactListStore.selectedContact]} @active-item-changed=${this.handleGridSelection}>
                    <vaadin-grid-column path="firstName" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="lastName" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="email" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="birthday" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="address" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="status" header="Status" auto-width></vaadin-grid-column>
                </vaadin-grid>
                <contact-form class="flex flex-col gap-s" ?hidden=${!contactListStore.selectedContact}></contact-form>
            </div>
            <vaadin-notification theme=${uiStore.message.error ? 'error' : 'contrast'} position="bottom-start" opened=${uiStore.message.open} .renderer=${(root: HTMLElement) => (root.textContent = uiStore.message.text)}></vaadin-notification>
        `;
    }

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
            if (contactListStore.selectedContact) {
                this.classList.add("editing");
            } else {
                this.classList.remove("editing");
            }
        });
    }
}

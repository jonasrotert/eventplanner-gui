import {makeAutoObservable, observable} from "mobx";
import {contactStore} from "Frontend/stores/app-store";
import ContactDTO from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/ContactDTO";
import ContactDTOModel from "Frontend/generated/de/jonasrotert/eventplanner/gui/service/dto/ContactDTOModel";

class ContactListStore {
    filterText = '';
    selectedContact: ContactDTO | null = null;

    constructor() {
        makeAutoObservable(
            this,
            {selectedContact: observable.ref},
            {autoBind: true}
        );
    }

    editNew() {
        this.selectedContact = ContactDTOModel.createEmptyValue();
    }

    cancelEdit() {
        this.selectedContact = null;
    }

    updateFilter(filterText: string) {
        this.filterText = filterText;
    }

    setSelectedContact(contact: ContactDTO) {
        this.selectedContact = contact;
    }

    get filteredContacts() {
        const filter = new RegExp(this.filterText, 'i');
        const contacts = contactStore.contacts;
        return contacts.filter((contact) =>
            filter.test(`${contact.firstName} ${contact.lastName}`)
        );
    }

    async save(contact: ContactDTO) {
        await contactStore.saveContact(contact);
        this.cancelEdit();
    }

    async delete() {
        if (this.selectedContact) {
            await contactStore.deleteContact(this.selectedContact);
            this.cancelEdit();
        }
    }
}

export const contactListStore = new ContactListStore();
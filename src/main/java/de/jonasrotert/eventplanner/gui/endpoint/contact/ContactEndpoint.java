package de.jonasrotert.eventplanner.gui.endpoint.contact;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import de.jonasrotert.eventplanner.core.domain.contact.Contact;
import de.jonasrotert.eventplanner.gui.service.ContactService;
import de.jonasrotert.eventplanner.gui.service.dto.ContactDTO;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class ContactEndpoint {

	@Autowired
	private ContactService contactService;

	@Nonnull
	public List<@Nonnull ContactDTO> getAllContact() {
		return this.contactService.getAllContacts();
	}

	@Nonnull
	public ContactDTO saveContact(ContactDTO contact) {
		return this.contactService.save(contact);
	}

	public void deleteContact(UUID contactId) {
		this.contactService.deleteById(contactId);
	}

}

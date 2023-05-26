package de.jonasrotert.eventplanner.gui.service;

import de.jonasrotert.eventplanner.core.domain.contact.Contact;
import de.jonasrotert.eventplanner.core.repository.contact.ContactRepository;
import de.jonasrotert.eventplanner.gui.mapping.MapStructMapper;
import de.jonasrotert.eventplanner.gui.service.dto.ContactDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContactService {

	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private MapStructMapper mapper;

	public ContactDTO save(final ContactDTO contactDTO) {
		if (contactDTO.getId() != null) {
			final var optionalContact = this.contactRepository.findById(contactDTO.getId());
			return this.mapper.toDTO(optionalContact.map(contact -> this.updateContact(contact, contactDTO)).orElseGet(() -> this.createContact(contactDTO)));
		}

		return this.mapper.toDTO(this.createContact(contactDTO));
	}

	private Contact createContact(final ContactDTO contactDTO) {
		return this.contactRepository.save(this.mapper.toEntity(contactDTO));
	}

	private Contact updateContact(final Contact existingContact, final ContactDTO delta) {
		existingContact.setLastName(delta.getLastName());
		existingContact.setFirstName(delta.getFirstName());
		existingContact.setEmail(delta.getEmail());

		return this.contactRepository.save(existingContact);
	}

	public void deleteById(final UUID contactId) {
		this.contactRepository.deleteById(contactId);
	}

	public List<ContactDTO> getAllContacts() {
		return this.contactRepository.findAll().stream().map(this.mapper::toDTO).collect(Collectors.toList());
	}
}

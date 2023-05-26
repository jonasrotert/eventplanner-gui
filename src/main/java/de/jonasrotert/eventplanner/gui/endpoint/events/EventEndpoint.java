package de.jonasrotert.eventplanner.gui.endpoint.events;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import de.jonasrotert.eventplanner.gui.service.EventService;
import de.jonasrotert.eventplanner.gui.service.dto.booking.EventDTO;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class EventEndpoint {

	@Autowired
	private EventService eventService;

	@Nonnull
	public List<@Nonnull EventDTO> getAllEvent() {
		return this.eventService.getAllEvents();
	}

	@Nonnull
	public EventDTO saveEvent(EventDTO contact) {
		return this.eventService.save(contact);
	}

	public void deleteEvent(UUID contactId) {
		this.eventService.deleteById(contactId);
	}

}

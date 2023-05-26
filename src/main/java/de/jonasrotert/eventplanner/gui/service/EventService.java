package de.jonasrotert.eventplanner.gui.service;

import de.jonasrotert.eventplanner.core.domain.booking.Event;
import de.jonasrotert.eventplanner.core.repository.booking.EventRepository;
import de.jonasrotert.eventplanner.gui.mapping.MapStructMapper;
import de.jonasrotert.eventplanner.gui.service.dto.booking.EventDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventService {

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private MapStructMapper mapper;

	public EventDTO save(final EventDTO EventDTO) {
		if (EventDTO.getId() != null) {
			final var optionalEvent = this.eventRepository.findById(EventDTO.getId());
			return this.mapper.toDTO(optionalEvent.map(event -> this.updateEvent(event, EventDTO)).orElseGet(() -> this.createEvent(EventDTO)));
		}

		return this.mapper.toDTO(this.createEvent(EventDTO));
	}

	private Event createEvent(final EventDTO EventDTO) {
		return this.eventRepository.save(this.mapper.toEntity(EventDTO));
	}

	private Event updateEvent(final Event existingEvent, final EventDTO delta) {
		this.mapper.mergeEntity(delta, existingEvent);
		return this.eventRepository.save(existingEvent);
	}

	public void deleteById(final UUID contactId) {
		this.eventRepository.deleteById(contactId);
	}

	public List<EventDTO> getAllEvents() {
		return this.eventRepository.findAll().stream().map(this.mapper::toDTO).collect(Collectors.toList());
	}
}

package de.jonasrotert.eventplanner.gui.service.dto.booking;

import de.jonasrotert.eventplanner.core.domain.base.BaseEntity;
import de.jonasrotert.eventplanner.core.domain.booking.BookingState;
import de.jonasrotert.eventplanner.core.domain.booking.Event;
import de.jonasrotert.eventplanner.core.domain.booking.Person;
import de.jonasrotert.eventplanner.gui.service.dto.base.DTOWithUUID;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.envers.Audited;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class BookingDTO  extends DTOWithUUID {

	@NotEmpty
	private final List<PersonDTO> persons = new ArrayList<>();

	@NotNull
	private LocalDateTime bookingDate;

	@NotNull
	private BookingState state;
}

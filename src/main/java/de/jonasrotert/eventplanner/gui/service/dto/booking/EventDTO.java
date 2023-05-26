package de.jonasrotert.eventplanner.gui.service.dto.booking;

import de.jonasrotert.eventplanner.core.domain.booking.EventState;
import de.jonasrotert.eventplanner.gui.service.dto.base.DTOWithUUID;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class EventDTO  extends DTOWithUUID {

	private final List<BookingDTO> bookings = new ArrayList<>();

	@NotBlank
	private String title;

	private String intro;

	@NotBlank
	private String description;

	@NotNull
	private LocalDate startDate;

	@NotNull
	private LocalDate endDate;

	@Valid
	private AddressDTO address;

	private EventState state;

	@Valid
	private DeadlineConfigurationDTO deadlineConfiguration;

	@Valid
	private CapacityConfigurationDTO capacityConfiguration;

	@Valid
	private BookingConfigurationDTO bookingConfiguration;

	@Valid
	private PricingConfigurationDTO pricingConfiguration;

	private Integer bookingsCount;

}

package de.jonasrotert.eventplanner.gui.service.dto.booking;

import de.jonasrotert.eventplanner.core.domain.booking.Address;
import de.jonasrotert.eventplanner.core.domain.booking.Sex;
import de.jonasrotert.eventplanner.gui.service.dto.base.DTOWithUUID;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class PersonDTO  extends DTOWithUUID {

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;

	@Email
	private String email;

	private Date birthday;

	private Sex sex;

	private Address address;
}

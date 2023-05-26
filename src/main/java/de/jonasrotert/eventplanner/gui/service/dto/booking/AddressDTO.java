package de.jonasrotert.eventplanner.gui.service.dto.booking;

import de.jonasrotert.eventplanner.gui.service.dto.base.DTOWithUUID;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class AddressDTO extends DTOWithUUID {


	private String description;

	@NotBlank
	private String street;

	@NotBlank
	private String postalCode;

	@NotBlank
	private String village;

	@NotBlank
	private String country;

}

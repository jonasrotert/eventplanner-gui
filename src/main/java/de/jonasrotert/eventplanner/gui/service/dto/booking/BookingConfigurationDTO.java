package de.jonasrotert.eventplanner.gui.service.dto.booking;

import de.jonasrotert.eventplanner.core.domain.base.BaseEntity;
import de.jonasrotert.eventplanner.gui.service.dto.base.DTOWithUUID;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.envers.Audited;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class BookingConfigurationDTO extends DTOWithUUID {


	private Boolean askForBirthday;

	private Boolean askForSex;

	private Boolean askForFurtherBookings;

}

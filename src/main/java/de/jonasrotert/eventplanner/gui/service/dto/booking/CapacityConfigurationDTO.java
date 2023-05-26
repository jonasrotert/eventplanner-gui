package de.jonasrotert.eventplanner.gui.service.dto.booking;

import de.jonasrotert.eventplanner.core.domain.base.BaseEntity;
import de.jonasrotert.eventplanner.gui.service.dto.base.DTOWithUUID;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.envers.Audited;


@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class CapacityConfigurationDTO  extends DTOWithUUID {


	@NotNull
	private Boolean queueIfMaximimumCapacityExceeds;

	@NotNull
	private Long maximumCapacity;

}

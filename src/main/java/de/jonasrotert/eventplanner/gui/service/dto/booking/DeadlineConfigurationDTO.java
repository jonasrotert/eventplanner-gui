package de.jonasrotert.eventplanner.gui.service.dto.booking;

import de.jonasrotert.eventplanner.gui.service.dto.base.DTOWithUUID;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class DeadlineConfigurationDTO  extends DTOWithUUID {


	@NotNull
	private Boolean queueIfDeadlineExceeds;

	@NotNull
	private LocalDate deadline;

}

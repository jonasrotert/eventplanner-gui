package de.jonasrotert.eventplanner.gui.service.dto.base;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
public abstract class DTOWithUUID {

	private UUID id;
}

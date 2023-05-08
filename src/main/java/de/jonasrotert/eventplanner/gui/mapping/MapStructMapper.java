package de.jonasrotert.eventplanner.gui.mapping;

import de.jonasrotert.eventplanner.core.domain.contact.Contact;
import de.jonasrotert.eventplanner.gui.service.dto.ContactDTO;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(builder = @Builder(disableBuilder = true), componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public abstract class MapStructMapper {

	public abstract ContactDTO toDTO(Contact entity);

	public abstract Contact toEntity(ContactDTO dto);
}

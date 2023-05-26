package de.jonasrotert.eventplanner.gui.mapping;

import de.jonasrotert.eventplanner.core.domain.booking.*;
import de.jonasrotert.eventplanner.core.domain.contact.Contact;
import de.jonasrotert.eventplanner.gui.service.dto.ContactDTO;
import de.jonasrotert.eventplanner.gui.service.dto.booking.*;
import org.mapstruct.*;

@Mapper(builder = @Builder(disableBuilder = true), componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class MapStructMapper {

	public abstract ContactDTO toDTO(Contact entity);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@Mapping(target = "status", ignore = true)
	@Mapping(target = "birthday", ignore = true)
	@Mapping(target = "sex", ignore = true)
	@Mapping(target = "formOfAddress", ignore = true)
	@Mapping(target = "salutation", ignore = true)
	@Mapping(target = "language", ignore = true)
	@Mapping(target = "address", ignore = true)
	@InheritInverseConfiguration
	public abstract Contact toEntity(ContactDTO dto);

	@Mapping(target = "bookingsCount", ignore = true)
	public abstract EventDTO toDTO(Event entity);

	@AfterMapping
	protected void enrichEventDTO(Event src, @MappingTarget EventDTO target) {
		target.setBookingsCount(src.getBookings().size());
	}

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@InheritInverseConfiguration
	public abstract Event toEntity(EventDTO dto);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@InheritInverseConfiguration
	public abstract Address toEntity(AddressDTO dto);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@InheritInverseConfiguration
	public abstract BookingConfiguration toEntity(BookingConfigurationDTO dto);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@Mapping(target = "event", ignore = true)
	@InheritInverseConfiguration
	public abstract Booking toEntity(BookingDTO dto);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@InheritInverseConfiguration
	public abstract CapacityConfiguration toEntity(CapacityConfigurationDTO dto);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@InheritInverseConfiguration
	public abstract DeadlineConfiguration toEntity(DeadlineConfigurationDTO dto);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@Mapping(target = "booking", ignore = true)
	@InheritInverseConfiguration
	public abstract Person toEntity(PersonDTO dto);

	@Mapping(target = "createdBy", ignore = true)
	@Mapping(target = "version", ignore = true)
	@InheritInverseConfiguration
	public abstract PricingConfiguration toEntity(PricingConfigurationDTO dto);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(EventDTO src, @MappingTarget Event target);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(AddressDTO dto, @MappingTarget Address target);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(BookingConfigurationDTO dto, @MappingTarget BookingConfiguration target);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(BookingDTO dto, @MappingTarget Booking target);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(CapacityConfigurationDTO dto, @MappingTarget CapacityConfiguration target);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(DeadlineConfigurationDTO dto, @MappingTarget DeadlineConfiguration target);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(PersonDTO dto, @MappingTarget Person target);

	@InheritConfiguration
	@InheritInverseConfiguration
	public abstract void mergeEntity(PricingConfigurationDTO dto, @MappingTarget PricingConfiguration target);
}

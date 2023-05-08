package de.jonasrotert.eventplanner.gui.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"de.jonasrotert.eventplanner.gui.service", "de.jonasrotert.eventplanner.gui.mapping"})
@Log4j2
public class ServiceConfig {

	@PostConstruct
	public void postConstruct() {
		log.info("Initialized ServiceConfig successfully.");
	}
}

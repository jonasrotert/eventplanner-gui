package de.jonasrotert.eventplanner.gui.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@SpringBootConfiguration
@Import({ServiceConfig.class, RepositoryConfig.class})
@PropertySource("classpath:application.properties")
@Log4j2
public class AppConfig {

	@PostConstruct
	public void postConstruct() {
		log.info("Initialized AppConfig successfully.");
	}
}

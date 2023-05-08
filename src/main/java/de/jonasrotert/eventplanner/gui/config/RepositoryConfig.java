package de.jonasrotert.eventplanner.gui.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {"de.jonasrotert.eventplanner.core.repository"}, repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
@EntityScan(basePackages = {"de.jonasrotert.eventplanner.core.domain"})
@ComponentScan(basePackages = {"de.jonasrotert.eventplanner.core.repository"})
@Log4j2
public class RepositoryConfig {

	@PostConstruct
	public void postConstruct() {
		log.info("Initialized RepositoryConfig successfully.");
	}
}

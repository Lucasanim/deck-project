package com.deck.discussions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class DiscussionsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiscussionsApplication.class, args);
	}

}

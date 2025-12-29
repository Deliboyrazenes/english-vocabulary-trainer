package com.vocab.vocabapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.springframework.scheduling.annotation.EnableScheduling
public class VocabappApplication {

	public static void main(String[] args) {
		SpringApplication.run(VocabappApplication.class, args);
	}



}

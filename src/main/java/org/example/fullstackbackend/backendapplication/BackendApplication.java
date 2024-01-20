package org.example.fullstackbackend.backendapplication;

import org.example.fullstackbackend.backendapplication.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

//    @Bean
//    CommandLineRunner commandLineRunner(TaskRepository taskRepository) {
//        return run -> {
//            System.out.println(taskRepository.findAll());
//        };
//    }
}

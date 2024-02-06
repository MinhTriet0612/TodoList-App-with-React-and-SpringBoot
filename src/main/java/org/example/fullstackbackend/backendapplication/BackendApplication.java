package org.example.fullstackbackend.backendapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
//        var user = User.builder()..build();
        SpringApplication.run(BackendApplication.class, args);
    }


}

package org.example.fullstackbackend.backendapplication.controller;


import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.service.SortingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api")
public class SortingController {

    SortingService sortingService;

    @Autowired
    public SortingController(SortingService sortingService) {
        this.sortingService = sortingService;
    }

    @GetMapping("/sorting")
    public List<Task> sortingTasksViaPriority() {
        List<Task> tasks = sortingService.sortListTasksViaPriority();
        return tasks;
    }
}

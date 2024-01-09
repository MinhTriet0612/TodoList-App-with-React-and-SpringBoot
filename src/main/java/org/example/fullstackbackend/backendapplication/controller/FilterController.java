package org.example.fullstackbackend.backendapplication.controller;

import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class FilterController {
    TaskService taskService;

    @Autowired
    public FilterController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/filteramount")
    public Map<Status, Integer> filterAmountTask() {
        Map<Status, Integer> statusIntegerMap = taskService.checkStatusTasks();
        return statusIntegerMap;
    }
}

package org.example.fullstackbackend.backendapplication.controller;

import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.service.FilterTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class FilterController {
    FilterTaskService filterTaskService;

    @Autowired
    public FilterController(FilterTaskService filterTaskService) {
        this.filterTaskService = filterTaskService;
    }

    @GetMapping("/filteramount")
    public Map<Status, Integer> filterAmountTask() {
        Map<Status, Integer> statusIntegerMap = filterTaskService.checkStatusTasks();
        return statusIntegerMap;
    }

    @GetMapping("/filterViaStatusAndPriority")
    public ResponseEntity<List<Task>> filterViaStatusAndPriority(@RequestParam("status") String status, @RequestParam("priority") String priority) {
        List<Task> tempTasks = filterTaskService.filterTasks(status, priority);
        return ResponseEntity.status(HttpStatus.OK).body(tempTasks);
    }
}

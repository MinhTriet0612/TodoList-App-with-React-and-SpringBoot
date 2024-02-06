package org.example.fullstackbackend.backendapplication.controller;

import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
public class UserController {
    TaskService taskService;

    @Autowired
    public UserController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/information")
    public Authentication user() {
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();
        return auth;
    }

    @GetMapping("/task")
    public ResponseEntity<List<Task>> FindAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/task/{id}")

    public Integer findTaskById(@PathVariable Integer id) {
        Task tempTask = taskService.getTaskById(id);
        return tempTask.getPriority().ordinal();
    }

    @PostMapping("/task")
    public void addTask(@RequestBody Task theTask) {
        taskService.addTask(theTask);
    }
//    @PutMapping("/task/{id}")
//    public ResponseEntity<?> editTask(@RequestBody Task theTask, @PathVariable Integer id) {
//
//    }

//    @DeleteMapping("/task/{id}")
//    public ResponseEntity<Task> deleteTask(@PathVariable Integer id) {
//
//    }
}

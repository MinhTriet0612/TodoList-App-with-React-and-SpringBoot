package org.example.fullstackbackend.backendapplication.controller;

import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.repository.TaskRepository;
import org.example.fullstackbackend.backendapplication.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class TaskController {
    TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService, TaskRepository taskRepository) {
        this.taskService = taskService;
    }


    @GetMapping("/task")
    public List<Task> FindAllTasks() {
        List<Task> tempListTasks = taskService.getAllTasks();
        return tempListTasks;
    }

    @GetMapping("/task/{id}")
    public Integer findTaskById(@PathVariable Integer id) {
        Task tempTask = taskService.getTaskById(id);
        return tempTask.getPriority().ordinal();
    }

    @PostMapping("/task")
    public ResponseEntity<Task> addTask(@RequestBody Task theTask) {
        boolean isAdded = taskService.addTask(theTask);
        System.out.println(isAdded);
        if (isAdded)
            return ResponseEntity.status(HttpStatus.OK).body(theTask);
        else return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


    @PutMapping("/task/{id}")
    public ResponseEntity<Task> editTask(@RequestBody Task theTask, @PathVariable Integer id) {
        Task tempTask = taskService.editTask(theTask, id);
        return ResponseEntity.status(HttpStatus.OK).body(tempTask);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable Integer id) {
        Task tempTask = taskService.deleteTask(id);
        return ResponseEntity.status(HttpStatus.OK).body(tempTask);
    }
}

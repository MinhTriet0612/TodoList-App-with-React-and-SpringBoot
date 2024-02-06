package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.model.Task;

import java.util.List;


public interface TaskService {
    List<Task> getAllTasks();

    void addTask(Task theTask);

    Task getTaskById(Integer id);

    Task editTask(Task theTask, Integer theId);

    Task deleteTask(Integer theId);


}

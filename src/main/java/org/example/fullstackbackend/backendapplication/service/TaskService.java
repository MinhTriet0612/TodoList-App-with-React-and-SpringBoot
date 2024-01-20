package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.model.Task;

import java.util.List;
import java.util.Map;


public interface TaskService {
    List<Task> getAllTasks();

    boolean addTask(Task theTask);

    Task getTaskById(Integer id);

    Task editTask(Task theTask, Integer theId);

    Task deleteTask(Integer theId);


}

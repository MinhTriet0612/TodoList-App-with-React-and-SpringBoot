package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SortingServiceImpl implements SortingService {

    TaskRepository taskRepository;

    @Autowired
    public SortingServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> sortListTasksViaPriority() {
        List<Task> tasks = taskRepository.findAll();
        tasks.sort((task, t1) -> task.getPriority().compareTo(t1.getPriority()));
        return tasks;
    }
}

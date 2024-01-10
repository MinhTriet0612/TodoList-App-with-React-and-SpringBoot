package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        Optional<List<Task>> tempTasks = Optional.of(taskRepository.findAll());
        if (tempTasks.isPresent()) {
            return tempTasks.get();
        }
        return new ArrayList<>();
    }

    @Override
    public Task getTaskById(Integer id) {
        return taskRepository.findTaskById(id);
    }

    @Override
    @Transactional
    public boolean addTask(Task theTask) {
        if (taskRepository.existsTaskByTitle(theTask.getTitle())) return false;
        else {
            taskRepository.save(theTask);
            return true;
        }
    }

    @Override
    @Transactional
    public Task editTask(Task theTask, Integer theId) {
        Task tempTask = taskRepository.findTaskById(theId);
        tempTask.setPriority(theTask.getPriority());
        tempTask.setNote(theTask.getNote());
        tempTask.setTitle(theTask.getTitle());
        tempTask.setStatus(theTask.getStatus());

        System.out.println(tempTask);
        System.out.println(theTask.getPriority());
        System.out.println(theTask.toString());
        System.out.println(tempTask);
        return tempTask;
    }

    @Override
    @Transactional
    public Task deleteTask(Integer theId) {
        Task task = taskRepository.findTaskById(theId);
        taskRepository.deleteById(theId);
        return task;
    }


}

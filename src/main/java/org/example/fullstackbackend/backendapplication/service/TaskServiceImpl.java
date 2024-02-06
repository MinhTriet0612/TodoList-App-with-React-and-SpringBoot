package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.model.User;
import org.example.fullstackbackend.backendapplication.repository.TaskRepository;
import org.example.fullstackbackend.backendapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;
    private UserRepository userRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks;
    }

    @Override
    public Task getTaskById(Integer id) {
        return taskRepository.findTaskById(id);
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
    public void addTask(Task theTask) {
        User userDetails = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

//        List<Task> tasks = userDetails.getTasks();
//        tasks.add(theTask);
//        userDetails.setTasks(tasks);
//        theTask.setUser(userDetails);
//        taskRepository.save(theTask);
        User user = userRepository.findUserByEmail(userDetails.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        theTask.setUser(user);
        taskRepository.save(theTask);
    }

    @Override
    @Transactional
    public Task deleteTask(Integer theId) {
        Task task = taskRepository.findTaskById(theId);
        taskRepository.deleteById(theId);
        return task;
    }
}

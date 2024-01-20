package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.common.Priority;
import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Service
public class FilterTaskServiceImpl implements FilterTaskService {
    TaskRepository taskRepository;

    @Autowired
    public FilterTaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Map<Status, Integer> checkStatusTasks() {
        Map<Status, Integer> tempMap = new HashMap<>();
        tempMap.put(Status.IN_PROGRESS, taskRepository.countTaskByStatus(Status.IN_PROGRESS));
        tempMap.put(Status.COMPLETED, taskRepository.countTaskByStatus(Status.COMPLETED));
        tempMap.put(Status.CANCELLED, taskRepository.countTaskByStatus(Status.CANCELLED));
        tempMap.put(Status.OVERDUE, taskRepository.countTaskByStatus(Status.OVERDUE));

        return tempMap;
    }

    @Override
    public List<Task> filterTasks(String status, String priority) {
        List<Task> tasks = taskRepository.findAll();
        Stream<Task> filterResult = tasks.stream();

        if (!status.equals("Default")) {
            filterResult = filterResult.filter(temp -> temp.getStatus().equals(Status.valueOf(status)));
        }
        if (!priority.equals("Default")) {
            filterResult = filterResult.filter(temp -> temp.getPriority().equals(Priority.valueOf(priority)));
        }

        return filterResult.toList();
    }
}

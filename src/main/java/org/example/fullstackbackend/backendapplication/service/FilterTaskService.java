package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.model.Task;

import java.util.List;
import java.util.Map;

public interface FilterTaskService {
    Map<Status, Integer> checkStatusTasks();

    List<Task> filterTasks(String status, String priority);
}

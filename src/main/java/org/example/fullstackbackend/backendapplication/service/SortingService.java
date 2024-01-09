package org.example.fullstackbackend.backendapplication.service;

import org.example.fullstackbackend.backendapplication.model.Task;

import java.util.List;

public interface SortingService {

    List<Task> sortListTasksViaPriority();
}

package org.example.fullstackbackend.backendapplication.repository;

import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    public Task findTaskById(int id);
    public boolean existsTaskByTitle(String taskName);

    Integer countTaskByStatus(Status status);

}

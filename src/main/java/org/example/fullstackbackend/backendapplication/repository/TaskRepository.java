package org.example.fullstackbackend.backendapplication.repository;

import org.example.fullstackbackend.backendapplication.common.Status;
import org.example.fullstackbackend.backendapplication.model.Task;
import org.example.fullstackbackend.backendapplication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    public Task findTaskById(int id);

    public boolean existsTaskByTitle(String taskName);

    Integer countTaskByStatus(Status status);

    List<Task> findTasksByUser_Id(Integer id);

    List<Task> findTasksByUser(User userDetails);
}

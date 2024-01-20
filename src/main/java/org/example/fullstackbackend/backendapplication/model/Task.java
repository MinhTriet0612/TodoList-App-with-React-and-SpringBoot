package org.example.fullstackbackend.backendapplication.model;

import jakarta.persistence.*;
import org.example.fullstackbackend.backendapplication.common.Priority;
import org.example.fullstackbackend.backendapplication.common.Status;


@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Column(name = "title")
    private String title;

    @Column(name = "note")
    private String note;

    public Task() {
    }

    public Task(Status status, Priority priority, String title, String note) {
        this.status = status;
        this.priority = priority;
        this.title = title;
        this.note = note;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", status=" + status +
                ", priority=" + priority +
                ", title='" + title + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}


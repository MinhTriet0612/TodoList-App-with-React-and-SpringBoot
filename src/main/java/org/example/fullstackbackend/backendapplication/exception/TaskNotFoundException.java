package org.example.fullstackbackend.backendapplication.exception;

/* Created by Arjun Gautam */

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(Integer id){
        super("Could not found the user with id "+ id);
    }
}


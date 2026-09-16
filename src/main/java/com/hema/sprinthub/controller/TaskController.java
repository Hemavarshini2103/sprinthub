package com.hema.sprinthub.controller;
import com.hema.sprinthub.enums.TaskStatus;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hema.sprinthub.dto.TaskRequestDTO;
import com.hema.sprinthub.dto.TaskResponseDTO;
import com.hema.sprinthub.service.TaskService;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public TaskResponseDTO createTask(
            @Valid @RequestBody TaskRequestDTO taskRequest) {

        return taskService.createTask(taskRequest);
    }

    @GetMapping
    public List<TaskResponseDTO> getAllTasks(
            org.springframework.security.core.Authentication authentication) {

        if (authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("MANAGER"))) {

            return taskService.getAllTasks(null);
        }

        String email = authentication.getName();

        return taskService.getAllTasks(email);
    }

    @GetMapping("/{id}")
    public TaskResponseDTO getTaskById(
            @PathVariable Long id,
            org.springframework.security.core.Authentication authentication) {

        String email = authentication.getName();

        boolean isManager = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("MANAGER"));

        return taskService.getTaskById(
                id,
                email,
                isManager
        );
    }

    @PutMapping("/{id}")
    public TaskResponseDTO updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequestDTO taskRequest) {

        return taskService.updateTask(id, taskRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(
            @PathVariable Long id) {

        taskService.deleteTask(id);
    }
    @PatchMapping("/{id}/status")
    public void updateTaskStatus(
            @PathVariable Long id,
            @RequestParam TaskStatus status,
            org.springframework.security.core.Authentication authentication) {

        String email = authentication.getName();

        boolean isManager = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("MANAGER"));

        taskService.updateTaskStatus(
                id,
                status,
                email,
                isManager
        );
    }
}
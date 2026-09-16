package com.hema.sprinthub.service.impl;
import com.hema.sprinthub.enums.TaskStatus;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hema.sprinthub.dto.TaskRequestDTO;
import com.hema.sprinthub.dto.TaskResponseDTO;
import com.hema.sprinthub.entity.Project;
import com.hema.sprinthub.entity.Task;
import com.hema.sprinthub.entity.User;
import com.hema.sprinthub.exception.TaskNotFoundException;
import com.hema.sprinthub.repository.ProjectRepository;
import com.hema.sprinthub.repository.TaskRepository;
import com.hema.sprinthub.repository.UserRepository;
import com.hema.sprinthub.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO taskRequest) {

        Project project = projectRepository.findById(taskRequest.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(taskRequest.getAssignedUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();

        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setStatus(taskRequest.getStatus());
        task.setProject(project);
        task.setAssignedUser(user);

        Task savedTask = taskRepository.save(task);

        return convertToResponseDTO(savedTask);
    }

    @Override
    public List<TaskResponseDTO> getAllTasks(String email) {

        List<Task> tasks;

        if (email == null) {
            tasks = taskRepository.findAll();
        } else {
            tasks = taskRepository.findByAssignedUser_Email(email);
        }

        return tasks
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponseDTO getTaskById(
            Long id,
            String email,
            boolean isManager) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        if (!isManager &&
                !task.getAssignedUser().getEmail().equals(email)) {

            throw new RuntimeException(
                    "You are not allowed to access this task"
            );
        }

        return convertToResponseDTO(task);
    }

    @Override
    public TaskResponseDTO updateTask(
            Long id,
            TaskRequestDTO taskRequest) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        Project project = projectRepository.findById(taskRequest.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(taskRequest.getAssignedUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingTask.setTitle(taskRequest.getTitle());
        existingTask.setDescription(taskRequest.getDescription());
        existingTask.setStatus(taskRequest.getStatus());
        existingTask.setProject(project);
        existingTask.setAssignedUser(user);

        Task updatedTask = taskRepository.save(existingTask);

        return convertToResponseDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        taskRepository.delete(existingTask);
    }

    private TaskResponseDTO convertToResponseDTO(Task task) {

        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getProject().getId(),
                task.getAssignedUser().getId()
        );
    }
    @Override
    public void updateTaskStatus(
            Long id,
            TaskStatus status,
            String email,
            boolean isManager) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        if (!isManager &&
                !task.getAssignedUser().getEmail().equals(email)) {

            throw new RuntimeException(
                    "You are not allowed to update this task"
            );
        }

        task.setStatus(status);

        taskRepository.save(task);
    }
}
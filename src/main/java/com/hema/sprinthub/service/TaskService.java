package com.hema.sprinthub.service;
import com.hema.sprinthub.enums.TaskStatus;
import java.util.List;

import com.hema.sprinthub.dto.TaskRequestDTO;
import com.hema.sprinthub.dto.TaskResponseDTO;

public interface TaskService {

    TaskResponseDTO createTask(TaskRequestDTO taskRequest);

    List<TaskResponseDTO> getAllTasks(String email);

    TaskResponseDTO getTaskById(
            Long id,
            String email,
            boolean isManager
    );

    TaskResponseDTO updateTask(Long id, TaskRequestDTO taskRequest);

    void deleteTask(Long id);
    void updateTaskStatus(
            Long id,
            TaskStatus status,
            String email,
            boolean isManager
    );
}
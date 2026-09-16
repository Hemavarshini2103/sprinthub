package com.hema.sprinthub.service.impl;
import java.util.List;
import org.springframework.stereotype.Service;
import com.hema.sprinthub.entity.Project;
import com.hema.sprinthub.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import com.hema.sprinthub.repository.ProjectRepository;
import com.hema.sprinthub.exception.ProjectNotFoundException;
import com.hema.sprinthub.repository.TaskRepository;
import org.springframework.transaction.annotation.Transactional;
@Service
public class ProjectServiceImpl implements ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private TaskRepository taskRepository;
	@Override
	public Project createProject(Project project) {

	    return projectRepository.save(project);
	}
	@Override
	public List<Project> getAllProjects() {

	    return projectRepository.findAll();
	}
	@Override
	public Project getProjectById(Long id) {

	    return projectRepository.findById(id)
	            .orElseThrow(() -> new ProjectNotFoundException("Project not found"));
	}
	@Override
	public Project updateProject(Long id, Project project) {

	    Project existingProject = projectRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Project not found"));

	    existingProject.setName(project.getName());
	    existingProject.setDescription(project.getDescription());
	    existingProject.setStatus(project.getStatus());

	    return projectRepository.save(existingProject);
	}
	@Override
	@Transactional
	public void deleteProject(Long id) {

	    Project project = projectRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Project not found"));

	    taskRepository.deleteByProjectId(id);

	    projectRepository.delete(project);
	}
}
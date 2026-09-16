package com.hema.sprinthub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.hema.sprinthub.entity.Project;
import com.hema.sprinthub.service.ProjectService;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @PostMapping
    public Project createProject(@RequestBody Project project) {

        return projectService.createProject(project);
    }
    @GetMapping
    public List<Project> getAllProjects() {

        return projectService.getAllProjects();
    }
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {

        return projectService.getProjectById(id);
    }
    @PutMapping("/{id}")
    public Project updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {

        return projectService.updateProject(id, project);
    }
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {

        projectService.deleteProject(id);
    }
}
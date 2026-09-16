package com.hema.sprinthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hema.sprinthub.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
package com.example.SpringbootBackend.repository;

import com.example.SpringbootBackend.dto.EmployeeDTO;
import com.example.SpringbootBackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT new com.example.SpringbootBackend.dto.EmployeeDTO" +
            "(e.id, e.userName, e.note,e.remember, e.switchMode, e.radioSelection, e.dropdownOption) " +
            "FROM Employee e WHERE e.id = (:id)")
    EmployeeDTO findEmployeeById(@Param("id") Long id);

    @Query("SELECT new com.example.SpringbootBackend.dto.EmployeeDTO" +
            "(e.id, e.userName, e.note,e.remember, e.switchMode, e.radioSelection, e.dropdownOption) " +
            "FROM Employee e ORDER BY e.id DESC")
    List<EmployeeDTO> findAllEmployee();
}

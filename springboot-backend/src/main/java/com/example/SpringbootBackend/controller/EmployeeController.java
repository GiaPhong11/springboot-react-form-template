package com.example.SpringbootBackend.controller;

import com.example.SpringbootBackend.dto.EmployeeDTO;
import com.example.SpringbootBackend.exception.ResourceNotFoundException;
import com.example.SpringbootBackend.model.Employee;
import com.example.SpringbootBackend.repository.EmployeeRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    //	get all employees
    @GetMapping("/findAllEmployees")
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAllEmployee();
    }

    //	add new employee
    @PostMapping("/addEmployees")
    public Employee addNewEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    //	add new employee
    @PostMapping("/addEmployees2")
    public ResponseEntity<Employee> addNewEmployee2(@RequestBody Employee employee, HttpServletRequest request) {

        Employee newEmployee = employeeRepository.save(employee);
        // Lấy URL tới nhân viên mới được tạo
        String requestURL = request.getRequestURL().toString();
        URI location = URI.create(requestURL + "/" + newEmployee.getId());
        return ResponseEntity.created(location).body(newEmployee);
    }

    //	add new employee
    @PostMapping("/addEmployees3")
    public ResponseEntity<Employee> addNewEmployee3(@RequestBody Employee employee, HttpServletRequest request) {
        return ResponseEntity.ok(employeeRepository.save(employee));
    }

    //	get employee by id
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDTO> findEmployeeById(@PathVariable Long id) {
        EmployeeDTO employee = employeeRepository.findEmployeeById(id);
        if (employee == null) {
            throw new ResourceNotFoundException("Not found id: '" + id + "'");
        }
        return ResponseEntity.ok(employee);
    }

    //	update employee
    @PutMapping("/updateEmployees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found id: '" + id + "'"));
        employee.setUserName(employeeDetails.getUserName());
        employee.setPassword(employeeDetails.getPassword());
        employee.setNote(employeeDetails.getNote());
        employee.setRemember(employeeDetails.getRemember());
        employee.setRadioSelection(employeeDetails.getRadioSelection());
        employee.setSwitchMode(employeeDetails.getSwitchMode());
        employee.setDropdownOption(employeeDetails.getDropdownOption());
        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    //	delete employee
    @DeleteMapping("/deleteEmployees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found id: '" + id + "'"));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}

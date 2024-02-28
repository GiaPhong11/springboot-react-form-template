package com.example.SpringbootBackend.controller;

import com.example.SpringbootBackend.exception.ResourceNotFoundException;
import com.example.SpringbootBackend.model.Employee;
import com.example.SpringbootBackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
//	get all employees
	@GetMapping("/findAllEmployees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

//	add new employee
	@PostMapping("/addEmployees")
	public Employee addNewEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
//	get employee by id
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Not found id: '"+id+"'"));
				return ResponseEntity.ok(employee);
	}
	
//	update employee
	@PutMapping("/updateEmployees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Not found id: '"+id+"'"));		
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
				.orElseThrow(()->new ResourceNotFoundException("Not found id: '"+id+"'"));		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("success", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}

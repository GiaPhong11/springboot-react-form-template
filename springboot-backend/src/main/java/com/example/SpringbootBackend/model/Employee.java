package com.example.SpringbootBackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "employees")
@Entity
@Data
public class Employee {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="password")
	private String password;
	
	@Column(name="input_text")
	private String note;

	@Column(name="remember")
	private Boolean remember;

	@Column(name="Switch")
	private Boolean switchMode;

	@Column(name="radio_selection")
	private String radioSelection;

	@Column(name="dropdown_option")
	private String dropdownOption;
}

package com.example.SpringbootBackend.dto;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private long id;
    private String userName;
    private String note;
    private Boolean remember;
    private Boolean switchMode;
    private String radioSelection;
    private String dropdownOption;
}

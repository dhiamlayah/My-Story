package com.designingapp.auth;


import com.designingapp.role.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Builder
public class RegistrationRequest {
    @NotEmpty(message = "the firstname is mandatory")
    @NotBlank(message = "the firstname is mandatory")
    private String firstname;
    @NotEmpty(message = "the lastname is mandatory")
    @NotBlank(message = "the lastname is mandatory")
    private String lastname;
    @Email(message = "email is not formatted")
    @NotEmpty(message = "the email is mandatory")
    @NotBlank(message = "the email is mandatory")
    private String email;
    @NotEmpty(message = "the password is mandatory")
    @NotBlank(message = "the password is mandatory")
    @Size(message = "the password should have 8 character at minimum")
    private String password;

}

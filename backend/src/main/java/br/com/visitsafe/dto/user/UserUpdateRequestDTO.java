package br.com.visitsafe.dto.user;

import lombok.Data;

@Data
public class UserUpdateRequestDTO {
    private String name;
    private String email;
    private String password;
}

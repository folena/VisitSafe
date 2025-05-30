package br.com.visitsafe.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateResponseDTO {
    private String name;
    private String email;
}

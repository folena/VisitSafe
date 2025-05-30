package br.com.visitsafe.dto.visitor;

import br.com.visitsafe.model.Vehicle;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuestVisitorDTO {

    @NotBlank
    @Schema(description = "Nome do visitante", required = true)
    private String name;

    @NotBlank
    @Schema(description = "Documento do visitante", required = true)
    private String document;

    @NotBlank
    @Schema(description = "Telefone do visitante", required = true)
    private String phone;

    private Vehicle vehicle;

    public GuestVisitorDTO(String name, String document, String phone) {
        this.name = name;
        this.document = document;
        this.phone = phone;
        this.vehicle = null;
    }
}

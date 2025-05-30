package br.com.visitsafe.dto.visitor;

import br.com.visitsafe.model.Vehicle;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriverVisitorDTO {

    @NotBlank
    @Schema(description = "Nome do visitante", required = true)
    private String name;

    @NotBlank
    @Schema(description = "Documento do visitante", required = true)
    private String document;

    @NotBlank
    @Schema(description = "Telefone do visitante", required = true)
    private String phone;

    @Schema(description = "Veículo do visitante, se houver", required = false)
    private Vehicle vehicle;

    @NotNull
    @Schema(description = "Possui antecedentes criminais", required = true)
    private Boolean hasCriminalBackgroundCheck;

    public DriverVisitorDTO(String name, String document, String phone, Boolean hasCriminalBackgroundCheck) {
        this.name = name;
        this.document = document;
        this.phone = phone;
        this.hasCriminalBackgroundCheck = hasCriminalBackgroundCheck;
        this.vehicle = null;
    }
}

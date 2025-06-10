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
public class ServiceProviderVisitorDTO {

    @NotBlank
    @Schema(description = "Nome do visitante", required = true)
    private String name;

    @NotBlank
    @Schema(description = "Documento do visitante", required = true)
    private String document;

    @NotBlank
    @Schema(description = "Telefone do visitante", required = true)
    private String phone;

    @NotNull
    @Schema(description = "Possui antecedentes criminais", required = true)
    private Boolean hasCriminalBackgroundCheck;

    private Vehicle vehicle;

    // Novo campo para indicar exceção fora do horário padrão
    @NotNull
    @Schema(description = "Liberação excepcional (fora dos horários padrão)", required = true)
    private Boolean isExceptional;

    public ServiceProviderVisitorDTO(
        String name,
        String document,
        String phone,
        Boolean hasCriminalBackgroundCheck
    ) {
        this.name = name;
        this.document = document;
        this.phone = phone;
        this.hasCriminalBackgroundCheck = hasCriminalBackgroundCheck;
        this.vehicle = null;
        this.isExceptional = false;
    }
}
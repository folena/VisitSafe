package br.com.visitsafe.model.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;


@JsonFormat(shape = JsonFormat.Shape.STRING)
@Schema(description = "Tipos de liberação")
public enum ReleaseTypeEnum {
    @Schema(description = "Convidado") GUEST,
    @Schema(description = "Família") FAMILY,
    @Schema(description = "Prestador de serviço") SERVICEPROVIDER,
    @Schema(description = "Entregador") DELIVERY,
    @Schema(description = "Motorista") DRIVER;
}

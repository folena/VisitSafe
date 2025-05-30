import type { UnitAssociationCodeResponseDTO } from './UnitAssociationCodeResponseDTO.ts'

export type GenerateUnitAssociationCodePathParams = {
  /**
   * @type string, uuid
   */
  unitId: string
}

/**
 * @description OK
 */
export type GenerateUnitAssociationCode200 = UnitAssociationCodeResponseDTO

export type GenerateUnitAssociationCodeQueryResponse = GenerateUnitAssociationCode200

export type GenerateUnitAssociationCodeQuery = {
  Response: GenerateUnitAssociationCode200
  PathParams: GenerateUnitAssociationCodePathParams
  Errors: any
}
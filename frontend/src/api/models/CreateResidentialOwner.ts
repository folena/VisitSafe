import type { ResidentialOwnerUserCreateRequestDTO } from './ResidentialOwnerUserCreateRequestDTO.ts'
import type { ResidentialOwnerUserResponseDTO } from './ResidentialOwnerUserResponseDTO.ts'

/**
 * @description OK
 */
export type CreateResidentialOwner200 = ResidentialOwnerUserResponseDTO

export type CreateResidentialOwnerMutationRequest = ResidentialOwnerUserCreateRequestDTO

export type CreateResidentialOwnerMutationResponse = CreateResidentialOwner200

export type CreateResidentialOwnerMutation = {
  Response: CreateResidentialOwner200
  Request: CreateResidentialOwnerMutationRequest
  Errors: any
}
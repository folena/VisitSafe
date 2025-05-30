import type { CondominiumResponseDTO } from './CondominiumResponseDTO.ts'
import type { ResidentialCondominiumCreateRequestDTO } from './ResidentialCondominiumCreateRequestDTO.ts'

/**
 * @description OK
 */
export type CreateResidentialCondominium200 = CondominiumResponseDTO

export type CreateResidentialCondominiumMutationRequest = ResidentialCondominiumCreateRequestDTO

export type CreateResidentialCondominiumMutationResponse = CreateResidentialCondominium200

export type CreateResidentialCondominiumMutation = {
  Response: CreateResidentialCondominium200
  Request: CreateResidentialCondominiumMutationRequest
  Errors: any
}
import type { CondominiumResponseDTO } from './CondominiumResponseDTO.ts'
import type { EnterpriseCondominiumCreateRequestDTO } from './EnterpriseCondominiumCreateRequestDTO.ts'

/**
 * @description OK
 */
export type CreateEnterpriseCondominium200 = CondominiumResponseDTO

export type CreateEnterpriseCondominiumMutationRequest = EnterpriseCondominiumCreateRequestDTO

export type CreateEnterpriseCondominiumMutationResponse = CreateEnterpriseCondominium200

export type CreateEnterpriseCondominiumMutation = {
  Response: CreateEnterpriseCondominium200
  Request: CreateEnterpriseCondominiumMutationRequest
  Errors: any
}
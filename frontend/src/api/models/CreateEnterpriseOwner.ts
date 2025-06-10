import type { EnterpriseOwnerUserCreateRequestDTO } from './EnterpriseOwnerUserCreateRequestDTO.ts'
import type { EnterpriseOwnerUserResponseDTO } from './EnterpriseOwnerUserResponseDTO.ts'

/**
 * @description OK
 */
export type CreateEnterpriseOwner200 = EnterpriseOwnerUserResponseDTO

export type CreateEnterpriseOwnerMutationRequest = EnterpriseOwnerUserCreateRequestDTO

export type CreateEnterpriseOwnerMutationResponse = CreateEnterpriseOwner200

export type CreateEnterpriseOwnerMutation = {
  Response: CreateEnterpriseOwner200
  Request: CreateEnterpriseOwnerMutationRequest
  Errors: any
}
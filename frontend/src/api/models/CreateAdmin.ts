import type { AdminUserCreateRequestDTO } from './AdminUserCreateRequestDTO.ts'
import type { AdminUserResponseDTO } from './AdminUserResponseDTO.ts'

/**
 * @description OK
 */
export type CreateAdmin200 = AdminUserResponseDTO

export type CreateAdminMutationRequest = AdminUserCreateRequestDTO

export type CreateAdminMutationResponse = CreateAdmin200

export type CreateAdminMutation = {
  Response: CreateAdmin200
  Request: CreateAdminMutationRequest
  Errors: any
}
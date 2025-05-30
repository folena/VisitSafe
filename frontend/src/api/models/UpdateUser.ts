import type { UserUpdateRequestDTO } from './UserUpdateRequestDTO.ts'
import type { UserUpdateResponseDTO } from './UserUpdateResponseDTO.ts'

export type UpdateUserPathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type UpdateUser200 = UserUpdateResponseDTO

export type UpdateUserMutationRequest = UserUpdateRequestDTO

export type UpdateUserMutationResponse = UpdateUser200

export type UpdateUserMutation = {
  Response: UpdateUser200
  Request: UpdateUserMutationRequest
  PathParams: UpdateUserPathParams
  Errors: any
}
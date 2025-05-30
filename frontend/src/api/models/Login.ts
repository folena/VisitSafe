import type { AuthRequestDTO } from './AuthRequestDTO.ts'
import type { AuthResponseDTO } from './AuthResponseDTO.ts'

/**
 * @description OK
 */
export type Login200 = AuthResponseDTO

export type LoginMutationRequest = AuthRequestDTO

export type LoginMutationResponse = Login200

export type LoginMutation = {
  Response: Login200
  Request: LoginMutationRequest
  Errors: any
}
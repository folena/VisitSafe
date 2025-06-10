import type { EmployeeUserCreateRequestDTO } from './EmployeeUserCreateRequestDTO.ts'
import type { EmployeeUserResponseDTO } from './EmployeeUserResponseDTO.ts'

/**
 * @description OK
 */
export type CreateEmployee200 = EmployeeUserResponseDTO

export type CreateEmployeeMutationRequest = EmployeeUserCreateRequestDTO

export type CreateEmployeeMutationResponse = CreateEmployee200

export type CreateEmployeeMutation = {
  Response: CreateEmployee200
  Request: CreateEmployeeMutationRequest
  Errors: any
}
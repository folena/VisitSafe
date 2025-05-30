import type { UnitCreateRequestDTO } from './UnitCreateRequestDTO.ts'

/**
 * @description OK
 */
export type CreateUnit200 = object

export type CreateUnitMutationRequest = UnitCreateRequestDTO

export type CreateUnitMutationResponse = CreateUnit200

export type CreateUnitMutation = {
  Response: CreateUnit200
  Request: CreateUnitMutationRequest
  Errors: any
}
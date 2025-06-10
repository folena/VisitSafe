import type { UnitResponseDTO } from './UnitResponseDTO.ts'
import type { UnitUpdateRequestDTO } from './UnitUpdateRequestDTO.ts'

/**
 * @description OK
 */
export type UpdateUnit200 = UnitResponseDTO

export type UpdateUnitMutationRequest = UnitUpdateRequestDTO

export type UpdateUnitMutationResponse = UpdateUnit200

export type UpdateUnitMutation = {
  Response: UpdateUnit200
  Request: UpdateUnitMutationRequest
  Errors: any
}
import type { UnitResponseDTO } from './UnitResponseDTO.ts'

/**
 * @description OK
 */
export type ListMyUnits200 = UnitResponseDTO[]

export type ListMyUnitsQueryResponse = ListMyUnits200

export type ListMyUnitsQuery = {
  Response: ListMyUnits200
  Errors: any
}
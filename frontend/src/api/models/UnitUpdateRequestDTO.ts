import type { AddressDTO } from './AddressDTO.ts'

export type UnitUpdateRequestDTO = {
  /**
   * @type string, uuid
   */
  id: string
  /**
   * @type string
   */
  block: string
  /**
   * @type string
   */
  lot: string
  /**
   * @type object
   */
  address: AddressDTO
}
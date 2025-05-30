import type { AddressDTO } from './AddressDTO.ts'

export type UnitCreateRequestDTO = {
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
import type { AddressDTO } from './AddressDTO.ts'

export type UnitResponseDTO = {
  /**
   * @description ID da unidade
   * @type string, uuid
   */
  id: string
  /**
   * @description Lote da unidade
   * @type string
   */
  lot: string
  /**
   * @description Bloco da unidade
   * @type string
   */
  block: string
  /**
   * @type object
   */
  address: AddressDTO
}
import type { Address } from './Address.ts'
import type { Condominium } from './Condominium.ts'
import type { ResidentialOwnerUser } from './ResidentialOwnerUser.ts'
import type { UnitAssociationCode } from './UnitAssociationCode.ts'

export type ResidentialUnit = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined
   */
  lot?: string
  /**
   * @type string | undefined
   */
  block?: string
  /**
   * @type object | undefined
   */
  condominium?: Condominium
  /**
   * @type object | undefined
   */
  address?: Address
  /**
   * @type array | undefined
   */
  associationCodes?: UnitAssociationCode[]
  /**
   * @type object | undefined
   */
  owner?: ResidentialOwnerUser
}
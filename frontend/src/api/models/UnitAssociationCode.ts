import type { Unit } from './Unit.ts'
import type { User } from './User.ts'

export type UnitAssociationCode = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined
   */
  code?: string
  /**
   * @type object | undefined
   */
  unit?: Unit
  /**
   * @type string | undefined, date-time
   */
  createdAt?: string
  /**
   * @type string | undefined, date-time
   */
  updatedAt?: string
  /**
   * @type object | undefined
   */
  usedBy?: User
  /**
   * @type object | undefined
   */
  lastUpdatedByAdmin?: User
}
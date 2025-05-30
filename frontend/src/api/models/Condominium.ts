import type { Unit } from './Unit.ts'

export const condominiumCondominiumTypeEnum = {
  BUSINESS: 'BUSINESS',
  RESIDENTIAL: 'RESIDENTIAL',
} as const

export type CondominiumCondominiumTypeEnum = (typeof condominiumCondominiumTypeEnum)[keyof typeof condominiumCondominiumTypeEnum]

export type Condominium = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  cnpj?: string
  /**
   * @type string | undefined
   */
  condominiumType?: CondominiumCondominiumTypeEnum
  /**
   * @type string | undefined, date-time
   */
  createdAt?: string
  /**
   * @type string | undefined, date-time
   */
  updatedAt?: string
  /**
   * @type array | undefined
   */
  units?: Unit[]
}
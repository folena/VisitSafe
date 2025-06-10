export const accountRoleEnum = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  OWNER: 'OWNER',
} as const

export type AccountRoleEnum = (typeof accountRoleEnum)[keyof typeof accountRoleEnum]

export type Account = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined
   */
  email?: string
  /**
   * @type string | undefined
   */
  password?: string
  /**
   * @type string | undefined
   */
  role?: AccountRoleEnum
  /**
   * @type boolean | undefined
   */
  active?: boolean
}
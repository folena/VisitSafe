/**
 * @description Horário de saída permitido por dia
 */
export type LocalTime = {
  /**
   * @type integer | undefined, int32
   */
  hour?: number
  /**
   * @type integer | undefined, int32
   */
  minute?: number
  /**
   * @type integer | undefined, int32
   */
  second?: number
  /**
   * @type integer | undefined, int32
   */
  nano?: number
}
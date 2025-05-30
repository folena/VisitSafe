export const releaseSummaryResponseDTOStatusEnum = {
  PENDING_CHECKIN: 'PENDING_CHECKIN',
  AUTHORIZED: 'AUTHORIZED',
  CHECKED_OUT: 'CHECKED_OUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const

export type ReleaseSummaryResponseDTOStatusEnum = (typeof releaseSummaryResponseDTOStatusEnum)[keyof typeof releaseSummaryResponseDTOStatusEnum]

export type ReleaseSummaryResponseDTO = {
  /**
   * @description ID da liberação
   * @type string, uuid
   */
  id: string
  /**
   * @description Nome do visitante
   * @type string
   */
  visitorName: string
  /**
   * @description Documento do visitante
   * @type string
   */
  visitorDocument: string
  /**
   * @description Tipo da liberação (e.g. GUEST, FAMILY, DELIVERY)
   * @type string
   */
  releaseType: string
  /**
   * @description Status atual da liberação
   * @type string
   */
  status: ReleaseSummaryResponseDTOStatusEnum
  /**
   * @description Horário inicial da validade da liberação
   * @type string, date-time
   */
  validFrom: string
  /**
   * @description Horário final da validade da liberação
   * @type string, date-time
   */
  validUntil: string
  /**
   * @description Horário permitido de entrada por dia
   * @type string, date-time
   */
  dailyStart: string
  /**
   * @description Horário permitido de saída por dia
   * @type string, date-time
   */
  dailyEnd: string
}
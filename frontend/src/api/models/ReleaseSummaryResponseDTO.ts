import type { LocalTime } from './LocalTime.ts'

export const releaseSummaryResponseDTOStatusEnum = {
  PENDING_CHECKIN: 'PENDING_CHECKIN',
  CHECKED_IN: 'CHECKED_IN',
  PENDING_RESIDENT_APPROVAL: 'PENDING_RESIDENT_APPROVAL',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
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
   * @description Data inicial da validade da liberação
   * @type string, date
   */
  validFrom: string
  /**
   * @description Data final da validade da liberação
   * @type string, date
   */
  validUntil: string
  /**
   * @type object
   */
  dailyStart: LocalTime
  /**
   * @type object
   */
  dailyEnd: LocalTime
}
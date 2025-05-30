import type { PageUnitResponseDTO } from './PageUnitResponseDTO.ts'

export type ListAllUnitsFromMyCondominiumQueryParams = {
  /**
   * @default 0
   * @type integer | undefined, int32
   */
  page?: number
  /**
   * @default 10
   * @type integer | undefined, int32
   */
  size?: number
}

/**
 * @description OK
 */
export type ListAllUnitsFromMyCondominium200 = PageUnitResponseDTO

export type ListAllUnitsFromMyCondominiumQueryResponse = ListAllUnitsFromMyCondominium200

export type ListAllUnitsFromMyCondominiumQuery = {
  Response: ListAllUnitsFromMyCondominium200
  QueryParams: ListAllUnitsFromMyCondominiumQueryParams
  Errors: any
}
import client from '@/lib/api'
import type { GenerateUnitAssociationCodeQueryResponse, GenerateUnitAssociationCodePathParams } from '../models/GenerateUnitAssociationCode.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getGenerateUnitAssociationCodeUrl(unitId: GenerateUnitAssociationCodePathParams['unitId']) {
  return `http://localhost:8080/units/associate/generate/${unitId}` as const
}

/**
 * @description Returns a valid code to associate a unit. If one already exists and is valid, it will be returned.
 * @summary Generate or retrieve an active association code for a unit
 * {@link /units/associate/generate/:unitId}
 */
export async function generateUnitAssociationCode(
  unitId: GenerateUnitAssociationCodePathParams['unitId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GenerateUnitAssociationCodeQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGenerateUnitAssociationCodeUrl(unitId).toString(),
    ...requestConfig,
  })
  return res.data
}
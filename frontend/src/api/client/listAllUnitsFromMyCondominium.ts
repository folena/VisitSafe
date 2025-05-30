import client from '@/lib/api'
import type { ListAllUnitsFromMyCondominiumQueryResponse, ListAllUnitsFromMyCondominiumQueryParams } from '../models/ListAllUnitsFromMyCondominium.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getListAllUnitsFromMyCondominiumUrl() {
  return `http://localhost:8080/units/all` as const
}

/**
 * {@link /units/all}
 */
export async function listAllUnitsFromMyCondominium(
  params?: ListAllUnitsFromMyCondominiumQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ListAllUnitsFromMyCondominiumQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getListAllUnitsFromMyCondominiumUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}
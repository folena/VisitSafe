import client from '@/lib/api'
import type { ListMyUnitsQueryResponse } from '../models/ListMyUnits.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getListMyUnitsUrl() {
  return `http://localhost:8080/units` as const
}

/**
 * {@link /units}
 */
export async function listMyUnits(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ListMyUnitsQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getListMyUnitsUrl().toString(),
    ...requestConfig,
  })
  return res.data
}
import client from '@/lib/api'
import type { ListMyReleasesByPeriodQueryResponse, ListMyReleasesByPeriodQueryParams } from '../models/ListMyReleasesByPeriod.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getListMyReleasesByPeriodUrl() {
  return `http://localhost:8080/releases/my` as const
}

/**
 * @summary Listar liberações da minha unidade por período
 * {@link /releases/my}
 */
export async function listMyReleasesByPeriod(params: ListMyReleasesByPeriodQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ListMyReleasesByPeriodQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getListMyReleasesByPeriodUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}
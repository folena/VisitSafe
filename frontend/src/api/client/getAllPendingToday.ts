import client from '@/lib/api'
import type { GetAllPendingTodayQueryResponse, GetAllPendingTodayQueryParams } from '../models/GetAllPendingToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getGetAllPendingTodayUrl() {
  return `http://localhost:8080/releases/today/pending` as const
}

/**
 * @summary Listar liberações PENDENTES de hoje do meu condomínio
 * {@link /releases/today/pending}
 */
export async function getAllPendingToday(params?: GetAllPendingTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetAllPendingTodayQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetAllPendingTodayUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}
import client from '@/lib/api'
import type { GetAllCheckedOutTodayQueryResponse, GetAllCheckedOutTodayQueryParams } from '../models/GetAllCheckedOutToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getGetAllCheckedOutTodayUrl() {
  return `http://localhost:8080/releases/today/checked-out` as const
}

/**
 * @summary Listar liberações FINALIZADAS de hoje do meu condomínio
 * {@link /releases/today/checked-out}
 */
export async function getAllCheckedOutToday(params?: GetAllCheckedOutTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetAllCheckedOutTodayQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetAllCheckedOutTodayUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}
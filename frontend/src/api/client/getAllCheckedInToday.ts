import client from '@/lib/api'
import type { GetAllCheckedInTodayQueryResponse, GetAllCheckedInTodayQueryParams } from '../models/GetAllCheckedInToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getGetAllCheckedInTodayUrl() {
  return `http://localhost:8080/releases/today/checked-in` as const
}

/**
 * @summary Listar liberações CHECKED-IN de hoje do meu condomínio
 * {@link /releases/today/checked-in}
 */
export async function getAllCheckedInToday(params?: GetAllCheckedInTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetAllCheckedInTodayQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetAllCheckedInTodayUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}
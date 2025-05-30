import client from '@/lib/api'
import type { GetAllCanceledTodayQueryResponse, GetAllCanceledTodayQueryParams } from '../models/GetAllCanceledToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getGetAllCanceledTodayUrl() {
  return `http://localhost:8080/releases/today/canceled` as const
}

/**
 * @summary Listar liberações CANCELADAS de hoje do meu condomínio
 * {@link /releases/today/canceled}
 */
export async function getAllCanceledToday(params?: GetAllCanceledTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetAllCanceledTodayQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetAllCanceledTodayUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}
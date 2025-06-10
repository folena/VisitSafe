import client from '@/lib/api'
import type { UpdateUnitMutationRequest, UpdateUnitMutationResponse } from '../models/UpdateUnit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getUpdateUnitUrl() {
  return `http://localhost:8080/units` as const
}

/**
 * {@link /units}
 */
export async function updateUnit(data: UpdateUnitMutationRequest, config: Partial<RequestConfig<UpdateUnitMutationRequest>> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateUnitMutationResponse, ResponseErrorConfig<Error>, UpdateUnitMutationRequest>({
    method: 'PUT',
    url: getUpdateUnitUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
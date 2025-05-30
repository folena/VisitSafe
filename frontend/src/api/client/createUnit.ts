import client from '@/lib/api'
import type { CreateUnitMutationRequest, CreateUnitMutationResponse } from '../models/CreateUnit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateUnitUrl() {
  return `http://localhost:8080/units` as const
}

/**
 * {@link /units}
 */
export async function createUnit(data: CreateUnitMutationRequest, config: Partial<RequestConfig<CreateUnitMutationRequest>> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateUnitMutationResponse, ResponseErrorConfig<Error>, CreateUnitMutationRequest>({
    method: 'POST',
    url: getCreateUnitUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
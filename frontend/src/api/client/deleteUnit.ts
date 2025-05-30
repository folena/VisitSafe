import client from '@/lib/api'
import type { DeleteUnitMutationResponse, DeleteUnitPathParams } from '../models/DeleteUnit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getDeleteUnitUrl(id: DeleteUnitPathParams['id']) {
  return `http://localhost:8080/units/${id}` as const
}

/**
 * {@link /units/:id}
 */
export async function deleteUnit(id: DeleteUnitPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteUnitMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteUnitUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}
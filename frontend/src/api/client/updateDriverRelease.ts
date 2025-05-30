import client from '@/lib/api'
import type { UpdateDriverReleaseMutationRequest, UpdateDriverReleaseMutationResponse, UpdateDriverReleasePathParams } from '../models/UpdateDriverRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getUpdateDriverReleaseUrl(id: UpdateDriverReleasePathParams['id']) {
  return `http://localhost:8080/releases/driver/${id}` as const
}

/**
 * {@link /releases/driver/:id}
 */
export async function updateDriverRelease(
  id: UpdateDriverReleasePathParams['id'],
  data: UpdateDriverReleaseMutationRequest,
  config: Partial<RequestConfig<UpdateDriverReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateDriverReleaseMutationResponse, ResponseErrorConfig<Error>, UpdateDriverReleaseMutationRequest>({
    method: 'PUT',
    url: getUpdateDriverReleaseUrl(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
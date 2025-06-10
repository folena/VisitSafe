import client from '@/lib/api'
import type { UpdateGuestReleaseMutationRequest, UpdateGuestReleaseMutationResponse, UpdateGuestReleasePathParams } from '../models/UpdateGuestRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getUpdateGuestReleaseUrl(id: UpdateGuestReleasePathParams['id']) {
  return `http://localhost:8080/releases/guest/${id}` as const
}

/**
 * {@link /releases/guest/:id}
 */
export async function updateGuestRelease(
  id: UpdateGuestReleasePathParams['id'],
  data: UpdateGuestReleaseMutationRequest,
  config: Partial<RequestConfig<UpdateGuestReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateGuestReleaseMutationResponse, ResponseErrorConfig<Error>, UpdateGuestReleaseMutationRequest>({
    method: 'PUT',
    url: getUpdateGuestReleaseUrl(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
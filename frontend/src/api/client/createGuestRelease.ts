import client from '@/lib/api'
import type { CreateGuestReleaseMutationRequest, CreateGuestReleaseMutationResponse } from '../models/CreateGuestRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateGuestReleaseUrl() {
  return `http://localhost:8080/releases/guest` as const
}

/**
 * {@link /releases/guest}
 */
export async function createGuestRelease(
  data: CreateGuestReleaseMutationRequest,
  config: Partial<RequestConfig<CreateGuestReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateGuestReleaseMutationResponse, ResponseErrorConfig<Error>, CreateGuestReleaseMutationRequest>({
    method: 'POST',
    url: getCreateGuestReleaseUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
import client from '@/lib/api'
import type { CreateAdminMutationRequest, CreateAdminMutationResponse } from '../models/CreateAdmin.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateAdminUrl() {
  return `http://localhost:8080/users/create/admin` as const
}

/**
 * @summary Create an Admin User
 * {@link /users/create/admin}
 */
export async function createAdmin(
  data?: CreateAdminMutationRequest,
  config: Partial<RequestConfig<CreateAdminMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateAdminMutationResponse, ResponseErrorConfig<Error>, CreateAdminMutationRequest>({
    method: 'POST',
    url: getCreateAdminUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
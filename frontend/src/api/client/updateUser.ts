import client from '@/lib/api'
import type { UpdateUserMutationRequest, UpdateUserMutationResponse, UpdateUserPathParams } from '../models/UpdateUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getUpdateUserUrl(id: UpdateUserPathParams['id']) {
  return `http://localhost:8080/users/update/${id}` as const
}

/**
 * @summary Update user information
 * {@link /users/update/:id}
 */
export async function updateUser(
  id: UpdateUserPathParams['id'],
  data?: UpdateUserMutationRequest,
  config: Partial<RequestConfig<UpdateUserMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateUserMutationResponse, ResponseErrorConfig<Error>, UpdateUserMutationRequest>({
    method: 'PATCH',
    url: getUpdateUserUrl(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
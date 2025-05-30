import client from '@kubb/plugin-client/clients/axios'
import type { UpdateUserMutationRequest, UpdateUserMutationResponse, UpdateUserPathParams } from '../models/UpdateUser.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateUser } from '../client/updateUser.ts'
import { useMutation } from '@tanstack/react-query'

export const updateUserMutationKey = () => [{ url: '/users/update/{id}' }] as const

export type UpdateUserMutationKey = ReturnType<typeof updateUserMutationKey>

/**
 * @summary Update user information
 * {@link /users/update/:id}
 */
export function useUpdateUser<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateUserMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateUserPathParams['id']; data?: UpdateUserMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateUserMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateUserMutationKey()

  return useMutation<UpdateUserMutationResponse, ResponseErrorConfig<Error>, { id: UpdateUserPathParams['id']; data?: UpdateUserMutationRequest }, TContext>({
    mutationFn: async ({ id, data }) => {
      return updateUser(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
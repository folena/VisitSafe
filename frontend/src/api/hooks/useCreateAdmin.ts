import client from '@kubb/plugin-client/clients/axios'
import type { CreateAdminMutationRequest, CreateAdminMutationResponse } from '../models/CreateAdmin.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createAdmin } from '../client/createAdmin.ts'
import { useMutation } from '@tanstack/react-query'

export const createAdminMutationKey = () => [{ url: '/users/create/admin' }] as const

export type CreateAdminMutationKey = ReturnType<typeof createAdminMutationKey>

/**
 * @summary Create an Admin User
 * {@link /users/create/admin}
 */
export function useCreateAdmin<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateAdminMutationResponse, ResponseErrorConfig<Error>, { data?: CreateAdminMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateAdminMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createAdminMutationKey()

  return useMutation<CreateAdminMutationResponse, ResponseErrorConfig<Error>, { data?: CreateAdminMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createAdmin(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
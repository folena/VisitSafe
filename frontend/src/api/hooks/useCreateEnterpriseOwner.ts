import client from '@kubb/plugin-client/clients/axios'
import type { CreateEnterpriseOwnerMutationRequest, CreateEnterpriseOwnerMutationResponse } from '../models/CreateEnterpriseOwner.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createEnterpriseOwner } from '../client/createEnterpriseOwner.ts'
import { useMutation } from '@tanstack/react-query'

export const createEnterpriseOwnerMutationKey = () => [{ url: '/users/create/enterprise-owner' }] as const

export type CreateEnterpriseOwnerMutationKey = ReturnType<typeof createEnterpriseOwnerMutationKey>

/**
 * @summary Create an Enterprise Owner User
 * {@link /users/create/enterprise-owner}
 */
export function useCreateEnterpriseOwner<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateEnterpriseOwnerMutationResponse, ResponseErrorConfig<Error>, { data?: CreateEnterpriseOwnerMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateEnterpriseOwnerMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createEnterpriseOwnerMutationKey()

  return useMutation<CreateEnterpriseOwnerMutationResponse, ResponseErrorConfig<Error>, { data?: CreateEnterpriseOwnerMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createEnterpriseOwner(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
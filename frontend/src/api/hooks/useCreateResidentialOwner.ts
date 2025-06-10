import client from '@kubb/plugin-client/clients/axios'
import type { CreateResidentialOwnerMutationRequest, CreateResidentialOwnerMutationResponse } from '../models/CreateResidentialOwner.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createResidentialOwner } from '../client/createResidentialOwner.ts'
import { useMutation } from '@tanstack/react-query'

export const createResidentialOwnerMutationKey = () => [{ url: '/users/create/residential-owner' }] as const

export type CreateResidentialOwnerMutationKey = ReturnType<typeof createResidentialOwnerMutationKey>

/**
 * @summary Create a Residential Owner User
 * {@link /users/create/residential-owner}
 */
export function useCreateResidentialOwner<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateResidentialOwnerMutationResponse,
      ResponseErrorConfig<Error>,
      { data?: CreateResidentialOwnerMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateResidentialOwnerMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createResidentialOwnerMutationKey()

  return useMutation<CreateResidentialOwnerMutationResponse, ResponseErrorConfig<Error>, { data?: CreateResidentialOwnerMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createResidentialOwner(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
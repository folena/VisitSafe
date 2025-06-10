import client from '@kubb/plugin-client/clients/axios'
import type { CreateServiceProviderReleaseMutationRequest, CreateServiceProviderReleaseMutationResponse } from '../models/CreateServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createServiceProviderRelease } from '../client/createServiceProviderRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const createServiceProviderReleaseMutationKey = () => [{ url: '/releases/service-provider' }] as const

export type CreateServiceProviderReleaseMutationKey = ReturnType<typeof createServiceProviderReleaseMutationKey>

/**
 * {@link /releases/service-provider}
 */
export function useCreateServiceProviderRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateServiceProviderReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { data: CreateServiceProviderReleaseMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateServiceProviderReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createServiceProviderReleaseMutationKey()

  return useMutation<CreateServiceProviderReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateServiceProviderReleaseMutationRequest }, TContext>(
    {
      mutationFn: async ({ data }) => {
        return createServiceProviderRelease(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
  )
}
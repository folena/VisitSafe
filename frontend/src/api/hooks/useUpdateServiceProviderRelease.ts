import client from '@kubb/plugin-client/clients/axios'
import type {
  UpdateServiceProviderReleaseMutationRequest,
  UpdateServiceProviderReleaseMutationResponse,
  UpdateServiceProviderReleasePathParams,
} from '../models/UpdateServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateServiceProviderRelease } from '../client/updateServiceProviderRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const updateServiceProviderReleaseMutationKey = () => [{ url: '/releases/service-provider/{id}' }] as const

export type UpdateServiceProviderReleaseMutationKey = ReturnType<typeof updateServiceProviderReleaseMutationKey>

/**
 * {@link /releases/service-provider/:id}
 */
export function useUpdateServiceProviderRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateServiceProviderReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateServiceProviderReleasePathParams['id']; data: UpdateServiceProviderReleaseMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateServiceProviderReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateServiceProviderReleaseMutationKey()

  return useMutation<
    UpdateServiceProviderReleaseMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateServiceProviderReleasePathParams['id']; data: UpdateServiceProviderReleaseMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateServiceProviderRelease(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
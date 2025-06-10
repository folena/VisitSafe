import client from '@kubb/plugin-client/clients/axios'
import type {
  JustifyServiceProviderReleaseMutationRequest,
  JustifyServiceProviderReleaseMutationResponse,
  JustifyServiceProviderReleasePathParams,
} from '../models/JustifyServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { justifyServiceProviderRelease } from '../client/justifyServiceProviderRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const justifyServiceProviderReleaseMutationKey = () => [{ url: '/releases/service-provider/{id}/justification' }] as const

export type JustifyServiceProviderReleaseMutationKey = ReturnType<typeof justifyServiceProviderReleaseMutationKey>

/**
 * {@link /releases/service-provider/:id/justification}
 */
export function useJustifyServiceProviderRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      JustifyServiceProviderReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: JustifyServiceProviderReleasePathParams['id']; data?: JustifyServiceProviderReleaseMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<JustifyServiceProviderReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? justifyServiceProviderReleaseMutationKey()

  return useMutation<
    JustifyServiceProviderReleaseMutationResponse,
    ResponseErrorConfig<Error>,
    { id: JustifyServiceProviderReleasePathParams['id']; data?: JustifyServiceProviderReleaseMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return justifyServiceProviderRelease(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
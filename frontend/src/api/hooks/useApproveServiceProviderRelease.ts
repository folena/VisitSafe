import client from '@kubb/plugin-client/clients/axios'
import type {
  ApproveServiceProviderReleaseMutationResponse,
  ApproveServiceProviderReleasePathParams,
  ApproveServiceProviderReleaseQueryParams,
} from '../models/ApproveServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { approveServiceProviderRelease } from '../client/approveServiceProviderRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const approveServiceProviderReleaseMutationKey = () => [{ url: '/releases/service-provider/{id}/approval' }] as const

export type ApproveServiceProviderReleaseMutationKey = ReturnType<typeof approveServiceProviderReleaseMutationKey>

/**
 * {@link /releases/service-provider/:id/approval}
 */
export function useApproveServiceProviderRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ApproveServiceProviderReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: ApproveServiceProviderReleasePathParams['id']; params: ApproveServiceProviderReleaseQueryParams },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? approveServiceProviderReleaseMutationKey()

  return useMutation<
    ApproveServiceProviderReleaseMutationResponse,
    ResponseErrorConfig<Error>,
    { id: ApproveServiceProviderReleasePathParams['id']; params: ApproveServiceProviderReleaseQueryParams },
    TContext
  >({
    mutationFn: async ({ id, params }) => {
      return approveServiceProviderRelease(id, params, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
import client from '@kubb/plugin-client/clients/axios'
import type { DeleteServiceProviderReleaseMutationResponse, DeleteServiceProviderReleasePathParams } from '../models/DeleteServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteServiceProviderRelease } from '../client/deleteServiceProviderRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteServiceProviderReleaseMutationKey = () => [{ url: '/releases/service-provider/{id}' }] as const

export type DeleteServiceProviderReleaseMutationKey = ReturnType<typeof deleteServiceProviderReleaseMutationKey>

/**
 * {@link /releases/service-provider/:id}
 */
export function useDeleteServiceProviderRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteServiceProviderReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: DeleteServiceProviderReleasePathParams['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteServiceProviderReleaseMutationKey()

  return useMutation<DeleteServiceProviderReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteServiceProviderReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteServiceProviderRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
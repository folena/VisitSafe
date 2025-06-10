import client from '@kubb/plugin-client/clients/axios'
import type { CancelReleaseMutationResponse, CancelReleasePathParams } from '../models/CancelRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { cancelRelease } from '../client/cancelRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const cancelReleaseMutationKey = () => [{ url: '/releases/{id}/cancel' }] as const

export type CancelReleaseMutationKey = ReturnType<typeof cancelReleaseMutationKey>

/**
 * {@link /releases/:id/cancel}
 */
export function useCancelRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<CancelReleaseMutationResponse, ResponseErrorConfig<Error>, { id: CancelReleasePathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cancelReleaseMutationKey()

  return useMutation<CancelReleaseMutationResponse, ResponseErrorConfig<Error>, { id: CancelReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return cancelRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
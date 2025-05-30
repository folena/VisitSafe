import client from '@kubb/plugin-client/clients/axios'
import type { CheckinReleaseMutationResponse, CheckinReleasePathParams } from '../models/CheckinRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { checkinRelease } from '../client/checkinRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const checkinReleaseMutationKey = () => [{ url: '/releases/{id}/checkin' }] as const

export type CheckinReleaseMutationKey = ReturnType<typeof checkinReleaseMutationKey>

/**
 * {@link /releases/:id/checkin}
 */
export function useCheckinRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<CheckinReleaseMutationResponse, ResponseErrorConfig<Error>, { id: CheckinReleasePathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? checkinReleaseMutationKey()

  return useMutation<CheckinReleaseMutationResponse, ResponseErrorConfig<Error>, { id: CheckinReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return checkinRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
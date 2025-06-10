import client from '@kubb/plugin-client/clients/axios'
import type { UpdateGuestReleaseMutationRequest, UpdateGuestReleaseMutationResponse, UpdateGuestReleasePathParams } from '../models/UpdateGuestRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateGuestRelease } from '../client/updateGuestRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const updateGuestReleaseMutationKey = () => [{ url: '/releases/guest/{id}' }] as const

export type UpdateGuestReleaseMutationKey = ReturnType<typeof updateGuestReleaseMutationKey>

/**
 * {@link /releases/guest/:id}
 */
export function useUpdateGuestRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateGuestReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateGuestReleasePathParams['id']; data: UpdateGuestReleaseMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateGuestReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateGuestReleaseMutationKey()

  return useMutation<
    UpdateGuestReleaseMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateGuestReleasePathParams['id']; data: UpdateGuestReleaseMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateGuestRelease(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
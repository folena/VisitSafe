import client from '@kubb/plugin-client/clients/axios'
import type { UpdateDriverReleaseMutationRequest, UpdateDriverReleaseMutationResponse, UpdateDriverReleasePathParams } from '../models/UpdateDriverRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateDriverRelease } from '../client/updateDriverRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const updateDriverReleaseMutationKey = () => [{ url: '/releases/driver/{id}' }] as const

export type UpdateDriverReleaseMutationKey = ReturnType<typeof updateDriverReleaseMutationKey>

/**
 * {@link /releases/driver/:id}
 */
export function useUpdateDriverRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateDriverReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateDriverReleasePathParams['id']; data: UpdateDriverReleaseMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateDriverReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateDriverReleaseMutationKey()

  return useMutation<
    UpdateDriverReleaseMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateDriverReleasePathParams['id']; data: UpdateDriverReleaseMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateDriverRelease(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
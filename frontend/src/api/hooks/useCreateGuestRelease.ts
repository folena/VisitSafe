import client from '@kubb/plugin-client/clients/axios'
import type { CreateGuestReleaseMutationRequest, CreateGuestReleaseMutationResponse } from '../models/CreateGuestRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createGuestRelease } from '../client/createGuestRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const createGuestReleaseMutationKey = () => [{ url: '/releases/guest' }] as const

export type CreateGuestReleaseMutationKey = ReturnType<typeof createGuestReleaseMutationKey>

/**
 * {@link /releases/guest}
 */
export function useCreateGuestRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateGuestReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateGuestReleaseMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateGuestReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createGuestReleaseMutationKey()

  return useMutation<CreateGuestReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateGuestReleaseMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createGuestRelease(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
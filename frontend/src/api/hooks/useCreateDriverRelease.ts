import client from '@kubb/plugin-client/clients/axios'
import type { CreateDriverReleaseMutationRequest, CreateDriverReleaseMutationResponse } from '../models/CreateDriverRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createDriverRelease } from '../client/createDriverRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const createDriverReleaseMutationKey = () => [{ url: '/releases/driver' }] as const

export type CreateDriverReleaseMutationKey = ReturnType<typeof createDriverReleaseMutationKey>

/**
 * {@link /releases/driver}
 */
export function useCreateDriverRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateDriverReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateDriverReleaseMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateDriverReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createDriverReleaseMutationKey()

  return useMutation<CreateDriverReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateDriverReleaseMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createDriverRelease(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
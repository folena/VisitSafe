import client from '@kubb/plugin-client/clients/axios'
import type { ApproveLateExit1MutationResponse, ApproveLateExit1PathParams, ApproveLateExit1QueryParams } from '../models/ApproveLateExit1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { approveLateExit1 } from '../client/approveLateExit1.ts'
import { useMutation } from '@tanstack/react-query'

export const approveLateExit1MutationKey = () => [{ url: '/releases/service-provider/{id}/approve' }] as const

export type ApproveLateExit1MutationKey = ReturnType<typeof approveLateExit1MutationKey>

/**
 * {@link /releases/service-provider/:id/approve}
 */
export function useApproveLateExit1<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ApproveLateExit1MutationResponse,
      ResponseErrorConfig<Error>,
      { id: ApproveLateExit1PathParams['id']; params: ApproveLateExit1QueryParams },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? approveLateExit1MutationKey()

  return useMutation<
    ApproveLateExit1MutationResponse,
    ResponseErrorConfig<Error>,
    { id: ApproveLateExit1PathParams['id']; params: ApproveLateExit1QueryParams },
    TContext
  >({
    mutationFn: async ({ id, params }) => {
      return approveLateExit1(id, params, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
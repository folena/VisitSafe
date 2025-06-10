import client from '@kubb/plugin-client/clients/axios'
import type { ApproveLateExitMutationResponse, ApproveLateExitPathParams, ApproveLateExitQueryParams } from '../models/ApproveLateExit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { approveLateExit } from '../client/approveLateExit.ts'
import { useMutation } from '@tanstack/react-query'

export const approveLateExitMutationKey = () => [{ url: '/releases/service-provider-exception/{id}/approve-late-exit' }] as const

export type ApproveLateExitMutationKey = ReturnType<typeof approveLateExitMutationKey>

/**
 * @summary Approve or reject late exit
 * {@link /releases/service-provider-exception/:id/approve-late-exit}
 */
export function useApproveLateExit<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ApproveLateExitMutationResponse,
      ResponseErrorConfig<Error>,
      { id: ApproveLateExitPathParams['id']; params: ApproveLateExitQueryParams },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? approveLateExitMutationKey()

  return useMutation<
    ApproveLateExitMutationResponse,
    ResponseErrorConfig<Error>,
    { id: ApproveLateExitPathParams['id']; params: ApproveLateExitQueryParams },
    TContext
  >({
    mutationFn: async ({ id, params }) => {
      return approveLateExit(id, params, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
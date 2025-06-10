import client from '@kubb/plugin-client/clients/axios'
import type { RecordExitMutationResponse, RecordExitPathParams } from '../models/RecordExit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { recordExit } from '../client/recordExit.ts'
import { useMutation } from '@tanstack/react-query'

export const recordExitMutationKey = () => [{ url: '/releases/service-provider/{id}/exit' }] as const

export type RecordExitMutationKey = ReturnType<typeof recordExitMutationKey>

/**
 * {@link /releases/service-provider/:id/exit}
 */
export function useRecordExit<TContext>(
  options: {
    mutation?: UseMutationOptions<RecordExitMutationResponse, ResponseErrorConfig<Error>, { id: RecordExitPathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? recordExitMutationKey()

  return useMutation<RecordExitMutationResponse, ResponseErrorConfig<Error>, { id: RecordExitPathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return recordExit(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
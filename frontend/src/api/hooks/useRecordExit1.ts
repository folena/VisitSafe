import client from '@kubb/plugin-client/clients/axios'
import type { RecordExit1MutationRequest, RecordExit1MutationResponse, RecordExit1PathParams } from '../models/RecordExit1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { recordExit1 } from '../client/recordExit1.ts'
import { useMutation } from '@tanstack/react-query'

export const recordExit1MutationKey = () => [{ url: '/releases/service-provider-exception/{id}/exit' }] as const

export type RecordExit1MutationKey = ReturnType<typeof recordExit1MutationKey>

/**
 * @summary Record service provider exit
 * {@link /releases/service-provider-exception/:id/exit}
 */
export function useRecordExit1<TContext>(
  options: {
    mutation?: UseMutationOptions<
      RecordExit1MutationResponse,
      ResponseErrorConfig<Error>,
      { id: RecordExit1PathParams['id']; data: RecordExit1MutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<RecordExit1MutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? recordExit1MutationKey()

  return useMutation<RecordExit1MutationResponse, ResponseErrorConfig<Error>, { id: RecordExit1PathParams['id']; data: RecordExit1MutationRequest }, TContext>({
    mutationFn: async ({ id, data }) => {
      return recordExit1(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
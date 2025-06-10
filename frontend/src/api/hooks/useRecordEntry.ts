import client from '@kubb/plugin-client/clients/axios'
import type { RecordEntryMutationResponse, RecordEntryPathParams } from '../models/RecordEntry.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { recordEntry } from '../client/recordEntry.ts'
import { useMutation } from '@tanstack/react-query'

export const recordEntryMutationKey = () => [{ url: '/releases/service-provider/{id}/entry' }] as const

export type RecordEntryMutationKey = ReturnType<typeof recordEntryMutationKey>

/**
 * {@link /releases/service-provider/:id/entry}
 */
export function useRecordEntry<TContext>(
  options: {
    mutation?: UseMutationOptions<RecordEntryMutationResponse, ResponseErrorConfig<Error>, { id: RecordEntryPathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? recordEntryMutationKey()

  return useMutation<RecordEntryMutationResponse, ResponseErrorConfig<Error>, { id: RecordEntryPathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return recordEntry(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
import client from '@kubb/plugin-client/clients/axios'
import type { RecordEntry1MutationResponse, RecordEntry1PathParams } from '../models/RecordEntry1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { recordEntry1 } from '../client/recordEntry1.ts'
import { useMutation } from '@tanstack/react-query'

export const recordEntry1MutationKey = () => [{ url: '/releases/service-provider-exception/{id}/entry' }] as const

export type RecordEntry1MutationKey = ReturnType<typeof recordEntry1MutationKey>

/**
 * @summary Record service provider entry
 * {@link /releases/service-provider-exception/:id/entry}
 */
export function useRecordEntry1<TContext>(
  options: {
    mutation?: UseMutationOptions<RecordEntry1MutationResponse, ResponseErrorConfig<Error>, { id: RecordEntry1PathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? recordEntry1MutationKey()

  return useMutation<RecordEntry1MutationResponse, ResponseErrorConfig<Error>, { id: RecordEntry1PathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return recordEntry1(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
import client from '@kubb/plugin-client/clients/axios'
import type { ListMyUnitsQueryResponse } from '../models/ListMyUnits.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { listMyUnits } from '../client/listMyUnits.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const listMyUnitsSuspenseQueryKey = () => [{ url: '/units' }] as const

export type ListMyUnitsSuspenseQueryKey = ReturnType<typeof listMyUnitsSuspenseQueryKey>

export function listMyUnitsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = listMyUnitsSuspenseQueryKey()
  return queryOptions<ListMyUnitsQueryResponse, ResponseErrorConfig<Error>, ListMyUnitsQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return listMyUnits(config)
    },
  })
}

/**
 * {@link /units}
 */
export function useListMyUnitsSuspense<
  TData = ListMyUnitsQueryResponse,
  TQueryData = ListMyUnitsQueryResponse,
  TQueryKey extends QueryKey = ListMyUnitsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<ListMyUnitsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listMyUnitsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(listMyUnitsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
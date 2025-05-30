import client from '@kubb/plugin-client/clients/axios'
import type { ListMyUnitsQueryResponse } from '../models/ListMyUnits.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { listMyUnits } from '../client/listMyUnits.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const listMyUnitsQueryKey = () => [{ url: '/units' }] as const

export type ListMyUnitsQueryKey = ReturnType<typeof listMyUnitsQueryKey>

export function listMyUnitsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = listMyUnitsQueryKey()
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
export function useListMyUnits<TData = ListMyUnitsQueryResponse, TQueryData = ListMyUnitsQueryResponse, TQueryKey extends QueryKey = ListMyUnitsQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<ListMyUnitsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listMyUnitsQueryKey()

  const query = useQuery({
    ...(listMyUnitsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
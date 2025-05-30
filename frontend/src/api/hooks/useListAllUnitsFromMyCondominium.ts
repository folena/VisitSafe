import client from '@kubb/plugin-client/clients/axios'
import type { ListAllUnitsFromMyCondominiumQueryResponse, ListAllUnitsFromMyCondominiumQueryParams } from '../models/ListAllUnitsFromMyCondominium.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { listAllUnitsFromMyCondominium } from '../client/listAllUnitsFromMyCondominium.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const listAllUnitsFromMyCondominiumQueryKey = (params?: ListAllUnitsFromMyCondominiumQueryParams) =>
  [{ url: '/units/all' }, ...(params ? [params] : [])] as const

export type ListAllUnitsFromMyCondominiumQueryKey = ReturnType<typeof listAllUnitsFromMyCondominiumQueryKey>

export function listAllUnitsFromMyCondominiumQueryOptions(
  params?: ListAllUnitsFromMyCondominiumQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = listAllUnitsFromMyCondominiumQueryKey(params)
  return queryOptions<ListAllUnitsFromMyCondominiumQueryResponse, ResponseErrorConfig<Error>, ListAllUnitsFromMyCondominiumQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return listAllUnitsFromMyCondominium(params, config)
    },
  })
}

/**
 * {@link /units/all}
 */
export function useListAllUnitsFromMyCondominium<
  TData = ListAllUnitsFromMyCondominiumQueryResponse,
  TQueryData = ListAllUnitsFromMyCondominiumQueryResponse,
  TQueryKey extends QueryKey = ListAllUnitsFromMyCondominiumQueryKey,
>(
  params?: ListAllUnitsFromMyCondominiumQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<ListAllUnitsFromMyCondominiumQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listAllUnitsFromMyCondominiumQueryKey(params)

  const query = useQuery({
    ...(listAllUnitsFromMyCondominiumQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
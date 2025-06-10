import client from '@kubb/plugin-client/clients/axios'
import type { ListAllUnitsFromMyCondominiumQueryResponse, ListAllUnitsFromMyCondominiumQueryParams } from '../models/ListAllUnitsFromMyCondominium.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { listAllUnitsFromMyCondominium } from '../client/listAllUnitsFromMyCondominium.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const listAllUnitsFromMyCondominiumSuspenseQueryKey = (params?: ListAllUnitsFromMyCondominiumQueryParams) =>
  [{ url: '/units/all' }, ...(params ? [params] : [])] as const

export type ListAllUnitsFromMyCondominiumSuspenseQueryKey = ReturnType<typeof listAllUnitsFromMyCondominiumSuspenseQueryKey>

export function listAllUnitsFromMyCondominiumSuspenseQueryOptions(
  params?: ListAllUnitsFromMyCondominiumQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = listAllUnitsFromMyCondominiumSuspenseQueryKey(params)
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
export function useListAllUnitsFromMyCondominiumSuspense<
  TData = ListAllUnitsFromMyCondominiumQueryResponse,
  TQueryData = ListAllUnitsFromMyCondominiumQueryResponse,
  TQueryKey extends QueryKey = ListAllUnitsFromMyCondominiumSuspenseQueryKey,
>(
  params?: ListAllUnitsFromMyCondominiumQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ListAllUnitsFromMyCondominiumQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listAllUnitsFromMyCondominiumSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(listAllUnitsFromMyCondominiumSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
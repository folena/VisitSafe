import client from '@kubb/plugin-client/clients/axios'
import type { ListMyReleasesByPeriodQueryResponse, ListMyReleasesByPeriodQueryParams } from '../models/ListMyReleasesByPeriod.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { listMyReleasesByPeriod } from '../client/listMyReleasesByPeriod.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const listMyReleasesByPeriodQueryKey = (params: ListMyReleasesByPeriodQueryParams) => [{ url: '/releases/my' }, ...(params ? [params] : [])] as const

export type ListMyReleasesByPeriodQueryKey = ReturnType<typeof listMyReleasesByPeriodQueryKey>

export function listMyReleasesByPeriodQueryOptions(
  params: ListMyReleasesByPeriodQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = listMyReleasesByPeriodQueryKey(params)
  return queryOptions<ListMyReleasesByPeriodQueryResponse, ResponseErrorConfig<Error>, ListMyReleasesByPeriodQueryResponse, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return listMyReleasesByPeriod(params, config)
    },
  })
}

/**
 * @summary Listar liberações da minha unidade por período
 * {@link /releases/my}
 */
export function useListMyReleasesByPeriod<
  TData = ListMyReleasesByPeriodQueryResponse,
  TQueryData = ListMyReleasesByPeriodQueryResponse,
  TQueryKey extends QueryKey = ListMyReleasesByPeriodQueryKey,
>(
  params: ListMyReleasesByPeriodQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<ListMyReleasesByPeriodQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listMyReleasesByPeriodQueryKey(params)

  const query = useQuery({
    ...(listMyReleasesByPeriodQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
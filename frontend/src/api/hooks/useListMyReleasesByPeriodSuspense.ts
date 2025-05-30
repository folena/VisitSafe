import client from '@kubb/plugin-client/clients/axios'
import type { ListMyReleasesByPeriodQueryResponse, ListMyReleasesByPeriodQueryParams } from '../models/ListMyReleasesByPeriod.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { listMyReleasesByPeriod } from '../client/listMyReleasesByPeriod.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const listMyReleasesByPeriodSuspenseQueryKey = (params: ListMyReleasesByPeriodQueryParams) =>
  [{ url: '/releases/my' }, ...(params ? [params] : [])] as const

export type ListMyReleasesByPeriodSuspenseQueryKey = ReturnType<typeof listMyReleasesByPeriodSuspenseQueryKey>

export function listMyReleasesByPeriodSuspenseQueryOptions(
  params: ListMyReleasesByPeriodQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = listMyReleasesByPeriodSuspenseQueryKey(params)
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
export function useListMyReleasesByPeriodSuspense<
  TData = ListMyReleasesByPeriodQueryResponse,
  TQueryData = ListMyReleasesByPeriodQueryResponse,
  TQueryKey extends QueryKey = ListMyReleasesByPeriodSuspenseQueryKey,
>(
  params: ListMyReleasesByPeriodQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ListMyReleasesByPeriodQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listMyReleasesByPeriodSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(listMyReleasesByPeriodSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
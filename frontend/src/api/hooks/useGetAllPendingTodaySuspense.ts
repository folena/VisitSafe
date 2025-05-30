import client from '@kubb/plugin-client/clients/axios'
import type { GetAllPendingTodayQueryResponse, GetAllPendingTodayQueryParams } from '../models/GetAllPendingToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getAllPendingToday } from '../client/getAllPendingToday.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getAllPendingTodaySuspenseQueryKey = (params?: GetAllPendingTodayQueryParams) =>
  [{ url: '/releases/today/pending' }, ...(params ? [params] : [])] as const

export type GetAllPendingTodaySuspenseQueryKey = ReturnType<typeof getAllPendingTodaySuspenseQueryKey>

export function getAllPendingTodaySuspenseQueryOptions(
  params?: GetAllPendingTodayQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getAllPendingTodaySuspenseQueryKey(params)
  return queryOptions<GetAllPendingTodayQueryResponse, ResponseErrorConfig<Error>, GetAllPendingTodayQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAllPendingToday(params, config)
    },
  })
}

/**
 * @summary Listar liberações PENDENTES de hoje do meu condomínio
 * {@link /releases/today/pending}
 */
export function useGetAllPendingTodaySuspense<
  TData = GetAllPendingTodayQueryResponse,
  TQueryData = GetAllPendingTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllPendingTodaySuspenseQueryKey,
>(
  params?: GetAllPendingTodayQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetAllPendingTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllPendingTodaySuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(getAllPendingTodaySuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
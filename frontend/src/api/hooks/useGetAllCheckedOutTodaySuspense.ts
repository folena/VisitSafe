import client from '@kubb/plugin-client/clients/axios'
import type { GetAllCheckedOutTodayQueryResponse, GetAllCheckedOutTodayQueryParams } from '../models/GetAllCheckedOutToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getAllCheckedOutToday } from '../client/getAllCheckedOutToday.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getAllCheckedOutTodaySuspenseQueryKey = (params?: GetAllCheckedOutTodayQueryParams) =>
  [{ url: '/releases/today/checked-out' }, ...(params ? [params] : [])] as const

export type GetAllCheckedOutTodaySuspenseQueryKey = ReturnType<typeof getAllCheckedOutTodaySuspenseQueryKey>

export function getAllCheckedOutTodaySuspenseQueryOptions(
  params?: GetAllCheckedOutTodayQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getAllCheckedOutTodaySuspenseQueryKey(params)
  return queryOptions<GetAllCheckedOutTodayQueryResponse, ResponseErrorConfig<Error>, GetAllCheckedOutTodayQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAllCheckedOutToday(params, config)
    },
  })
}

/**
 * @summary Listar liberações FINALIZADAS de hoje do meu condomínio
 * {@link /releases/today/checked-out}
 */
export function useGetAllCheckedOutTodaySuspense<
  TData = GetAllCheckedOutTodayQueryResponse,
  TQueryData = GetAllCheckedOutTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllCheckedOutTodaySuspenseQueryKey,
>(
  params?: GetAllCheckedOutTodayQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetAllCheckedOutTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllCheckedOutTodaySuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(getAllCheckedOutTodaySuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
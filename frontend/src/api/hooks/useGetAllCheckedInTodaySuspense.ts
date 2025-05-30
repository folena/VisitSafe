import client from '@kubb/plugin-client/clients/axios'
import type { GetAllCheckedInTodayQueryResponse, GetAllCheckedInTodayQueryParams } from '../models/GetAllCheckedInToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getAllCheckedInToday } from '../client/getAllCheckedInToday.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getAllCheckedInTodaySuspenseQueryKey = (params?: GetAllCheckedInTodayQueryParams) =>
  [{ url: '/releases/today/checked-in' }, ...(params ? [params] : [])] as const

export type GetAllCheckedInTodaySuspenseQueryKey = ReturnType<typeof getAllCheckedInTodaySuspenseQueryKey>

export function getAllCheckedInTodaySuspenseQueryOptions(
  params?: GetAllCheckedInTodayQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getAllCheckedInTodaySuspenseQueryKey(params)
  return queryOptions<GetAllCheckedInTodayQueryResponse, ResponseErrorConfig<Error>, GetAllCheckedInTodayQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAllCheckedInToday(params, config)
    },
  })
}

/**
 * @summary Listar liberações CHECKED-IN de hoje do meu condomínio
 * {@link /releases/today/checked-in}
 */
export function useGetAllCheckedInTodaySuspense<
  TData = GetAllCheckedInTodayQueryResponse,
  TQueryData = GetAllCheckedInTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllCheckedInTodaySuspenseQueryKey,
>(
  params?: GetAllCheckedInTodayQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetAllCheckedInTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllCheckedInTodaySuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(getAllCheckedInTodaySuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
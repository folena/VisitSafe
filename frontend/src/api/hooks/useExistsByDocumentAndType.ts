import client from '@kubb/plugin-client/clients/axios'
import type { ExistsByDocumentAndTypeQueryResponse, ExistsByDocumentAndTypeQueryParams } from '../models/ExistsByDocumentAndType.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { existsByDocumentAndType } from '../client/existsByDocumentAndType.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const existsByDocumentAndTypeQueryKey = (params: ExistsByDocumentAndTypeQueryParams) =>
  [{ url: '/visitors/exists' }, ...(params ? [params] : [])] as const

export type ExistsByDocumentAndTypeQueryKey = ReturnType<typeof existsByDocumentAndTypeQueryKey>

export function existsByDocumentAndTypeQueryOptions(
  params: ExistsByDocumentAndTypeQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = existsByDocumentAndTypeQueryKey(params)
  return queryOptions<ExistsByDocumentAndTypeQueryResponse, ResponseErrorConfig<Error>, ExistsByDocumentAndTypeQueryResponse, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return existsByDocumentAndType(params, config)
    },
  })
}

/**
 * @summary Verifica se existe visitante por documento e tipo
 * {@link /visitors/exists}
 */
export function useExistsByDocumentAndType<
  TData = ExistsByDocumentAndTypeQueryResponse,
  TQueryData = ExistsByDocumentAndTypeQueryResponse,
  TQueryKey extends QueryKey = ExistsByDocumentAndTypeQueryKey,
>(
  params: ExistsByDocumentAndTypeQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<ExistsByDocumentAndTypeQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? existsByDocumentAndTypeQueryKey(params)

  const query = useQuery({
    ...(existsByDocumentAndTypeQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
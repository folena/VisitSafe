import client from '@kubb/plugin-client/clients/axios'
import type { ExistsByDocumentAndTypeQueryResponse, ExistsByDocumentAndTypeQueryParams } from '../models/ExistsByDocumentAndType.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { existsByDocumentAndType } from '../client/existsByDocumentAndType.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const existsByDocumentAndTypeSuspenseQueryKey = (params: ExistsByDocumentAndTypeQueryParams) =>
  [{ url: '/visitors/exists' }, ...(params ? [params] : [])] as const

export type ExistsByDocumentAndTypeSuspenseQueryKey = ReturnType<typeof existsByDocumentAndTypeSuspenseQueryKey>

export function existsByDocumentAndTypeSuspenseQueryOptions(
  params: ExistsByDocumentAndTypeQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = existsByDocumentAndTypeSuspenseQueryKey(params)
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
export function useExistsByDocumentAndTypeSuspense<
  TData = ExistsByDocumentAndTypeQueryResponse,
  TQueryData = ExistsByDocumentAndTypeQueryResponse,
  TQueryKey extends QueryKey = ExistsByDocumentAndTypeSuspenseQueryKey,
>(
  params: ExistsByDocumentAndTypeQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ExistsByDocumentAndTypeQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? existsByDocumentAndTypeSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(existsByDocumentAndTypeSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
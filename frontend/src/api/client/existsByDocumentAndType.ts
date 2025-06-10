import client from '@/lib/api'
import type { ExistsByDocumentAndTypeQueryResponse, ExistsByDocumentAndTypeQueryParams } from '../models/ExistsByDocumentAndType.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getExistsByDocumentAndTypeUrl() {
  return `http://localhost:8080/visitors/exists` as const
}

/**
 * @summary Verifica se existe visitante por documento e tipo
 * {@link /visitors/exists}
 */
export async function existsByDocumentAndType(params: ExistsByDocumentAndTypeQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ExistsByDocumentAndTypeQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getExistsByDocumentAndTypeUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}
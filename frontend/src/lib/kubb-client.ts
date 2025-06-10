import baseClient from '@kubb/plugin-client/clients/axios'
import axios from '@/lib/axios'
import type { RequestConfig, ResponseConfig } from '@kubb/plugin-client/clients/axios'

const kubbClient = <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  return axios.request(config)
}

kubbClient.getConfig = baseClient.getConfig
kubbClient.setConfig = baseClient.setConfig

export default kubbClient

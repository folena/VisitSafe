import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { API_BASE_URL } from '@/config/api'

// 🔧 Tipos esperados pelo Kubb - ajustados para compatibilidade
export interface RequestConfig<T = any> extends AxiosRequestConfig {
  data?: T;
}

// Modificação aqui para resolver o erro de tipagem
export interface ResponseErrorConfig<T = any> {
  data?: T;
}

// 🍪 Lê cookies
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  )
  return match ? decodeURIComponent(match[1]) : undefined
}

// ❌ Apaga cookies
function eraseCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
}

// ✅ Instância do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// ✅ Interceptor de request: injeta token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const path = config.url?.split('?')[0] ?? ''
  const isAuthRoute = path.endsWith('/auth/login') || path.endsWith('/auth/register')
  if (!isAuthRoute) {
    const token = getCookie('token')
    if (token) {
      config.headers = config.headers ?? {}
      ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }
  }
  return config
})

// ❗ Interceptor de resposta: trata 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Token expirado ou inválido. Redirecionando para login...')
      eraseCookie('token')
      eraseCookie('role')
      eraseCookie('email')
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Função client que corresponde à assinatura esperada pelo Kubb
async function client<ResponseType = any, ErrorType = any, RequestType = any>(
  config: RequestConfig<RequestType>
): Promise<AxiosResponse<ResponseType>> {
  return api(config);
}

export default client;
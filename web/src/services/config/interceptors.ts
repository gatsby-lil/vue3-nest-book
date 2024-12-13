import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export function requestInterceptor(config: AxiosRequestConfig) {
  return config
}
export function requestInterceptorCatch(error: any) {
  return error
}
export function responseInterceptor(result: AxiosResponse) {
  return result
}
export function responseInterceptorCatch(error: any) {
  return error
}

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * 1. 请求拦截
 *    1.1 添加鉴权
 *    1.2 配置参数
 * 2. 响应拦截
 *    1.1 http状态码拦截
 *    1.2 后端约定的报错拦截
 *    1.3 是否需要配置展示错误提示信息以及loading
 *
 */
interface CustomRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface CustomRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CustomRequestInterceptors<T>
}

class CustomRequest {
  instance: AxiosInstance
  constructor(config: CustomRequestConfig) {
    // 初始化axios实例
    this.instance = axios.create(config)

    // 设置全局拦截器
    this.instance.interceptors.request.use(
      (config) => config,
      (error) => error,
    )
    this.instance.interceptors.response.use(
      (result) => result.data,
      (error) => error,
    )

    // 设置实例拦截器
    this.instance.interceptors.request.use(config.interceptors?.requestInterceptor, config.interceptors?.requestInterceptorCatch)
    this.instance.interceptors.response.use(config.interceptors?.responseInterceptor, config.interceptors?.responseInterceptorCatch)
  }

  request<T = any>(config?: CustomRequestConfig<T>) {
    if (config?.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config as any)
        .then((res) => {
          if (config?.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          if (config?.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }
          reject(err)
        })
    })
  }

  get<T = any>(config: CustomRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: CustomRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: CustomRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: CustomRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default CustomRequest

import { baseURL, requestInterceptor, requestInterceptorCatch, responseInterceptor, responseInterceptorCatch } from './config'
import CustomRequest from './request'

const baseCustomRequest = new CustomRequest({
  baseURL: baseURL,
  interceptors: {
    requestInterceptor,
    requestInterceptorCatch,
    responseInterceptor,
    responseInterceptorCatch,
  },
})

export default baseCustomRequest

import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { createRequestClient } from '@liofelix/unified-request'

import { useAppConfig } from '@/hooks/useAppConfig'
import router from '@/router'
import pinia from '@/stores'
import { useAuthStore } from '@/stores/auth'
import type { ApiResult } from '@/types/api'

const { appSystemApi } = useAppConfig()

const requestClient = createRequestClient({
  axiosConfig: {
    baseURL: appSystemApi,
  },
  interceptor: {
    request: [
      (config) => {
        const { accessToken } = useAuthStore(pinia)

        if (accessToken) {
          config.headers.set('Authorization', `Bearer ${accessToken}`)
        }

        return config
      },
    ],
    response: [
      (response) => response,
      async (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          useAuthStore(pinia).clearAccessToken()

          if (router.currentRoute.value.name !== 'login') {
            await router.replace({ name: 'login' })
          }
        }

        return Promise.reject(error)
      },
    ],
  },
})

export class ApiError extends Error {
  code: number

  constructor(code: number, msg: string) {
    super(msg)
    this.name = 'ApiError'
    this.code = code
  }
}

async function unwrapResponse<T>(response: AxiosResponse<ApiResult<T>>): Promise<T> {
  const { code, data, msg } = response.data

  if (code !== 200) {
    throw new ApiError(code, msg || '请求失败')
  }

  return data
}

export const request = {
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return requestClient.post<ApiResult<T>>(url, data, config).then(unwrapResponse)
  },
}

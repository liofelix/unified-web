import { request } from '@/utils/request'

export interface AuthLoginParams {
  username: string
  password: string
}

export interface AuthLoginResult {
  accessToken: string
}

export function login(params: AuthLoginParams): Promise<AuthLoginResult> {
  return request.post<AuthLoginResult>('/system/auth/login', params)
}

export function logout(): Promise<void> {
  return request.post<void>('/system/auth/logout')
}

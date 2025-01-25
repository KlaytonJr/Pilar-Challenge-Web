/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type Canceler, type AxiosResponse, AxiosError } from 'axios'
import $http from '../plugins/http'

export type ServiceObject<R> = [Promise<R>, Canceler | null]

export const Get = <R>(url: string = '', query?: { [key: string]: any }): ServiceObject<R> => {
  let requestCanceler: Canceler | null = null

  // Pegar a query String
  const request = new Promise<R>((resolve, reject) => {
    // Realizar requisição HTTP
    $http
      .get(url, { params: query, cancelToken: new axios.CancelToken((c) => (requestCanceler = c)) })
      .then((resp: AxiosResponse<R>) => {
        resolve(resp.data)
      })
      .catch((error: AxiosError) => {
        reject(error)
      })
  })

  return [request, requestCanceler]
}

export const Post = <M, R>(
  url: string,
  model: M,
  options?: { timeout?: number },
): ServiceObject<R> => {
  let requestCanceler: Canceler | null = null

  const request = new Promise<R>((resolve, reject) => {
    $http
      .post<M, AxiosResponse<R>>(url, model, {
        cancelToken: new axios.CancelToken((c) => (requestCanceler = c)),
        timeout: options?.timeout || 45000,
      })
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((error: AxiosError) => {
        reject(error)
      })
  })

  return [request, requestCanceler]
}

export const Patch = <M, R>(
  url: string,
  model: M,
  options?: { timeout?: number },
): ServiceObject<R> => {
  let requestCanceler: Canceler | null = null

  const request = new Promise<R>((resolve, reject) => {
    $http
      .patch<M, AxiosResponse<R>>(url, model, {
        cancelToken: new axios.CancelToken((c) => (requestCanceler = c)),
        timeout: options?.timeout || 45000,
      })
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((error: AxiosError) => {
        reject(error)
      })
  })

  return [request, requestCanceler]
}

export const Put = <M, R>(
  url: string,
  model: M,
  options?: { timeout?: number },
): ServiceObject<R> => {
  let requestCanceler: Canceler | null = null

  const request = new Promise<R>((resolve, reject) => {
    $http
      .put<M, AxiosResponse<R>>(url, model, {
        cancelToken: new axios.CancelToken((c) => (requestCanceler = c)),
        timeout: options?.timeout || 45000,
      })
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((error: AxiosError) => {
        reject(error)
      })
  })

  return [request, requestCanceler]
}

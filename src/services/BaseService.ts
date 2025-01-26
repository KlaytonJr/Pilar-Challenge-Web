/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Canceler, type AxiosResponse, AxiosError } from 'axios'
import $http from '../plugins/http'
import { useToast } from '../plugins/toast'

export type ServiceObject<R> = [Promise<R>, Canceler | null]

export const Get = <R>(
  url: string = '',
  query?: { [key: string]: any },
  toast = useToast(),
): ServiceObject<R> => {
  const { showError } = toast

  // Pegar a query String
  const request = new Promise<R>((resolve, reject) => {
    // Realizar requisição HTTP
    $http
      .get(url, { params: query })
      .then((resp: AxiosResponse<R>) => {
        resolve(resp.data)
      })
      .catch((error: AxiosError) => {
        showError('Ocorreu alguma falha ao executar a requisição')
        reject(error)
      })
  })

  return [request, null]
}

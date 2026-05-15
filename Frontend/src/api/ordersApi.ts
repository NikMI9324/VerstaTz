import axios, { type AxiosError, isAxiosError } from 'axios'
import type { OrderDto, CreateOrderDto } from './Dtos'

export type { OrderDto, CreateOrderDto } from './Dtos'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

function messageFromAxiosError(err: AxiosError): string {
  const data = err.response?.data
  if (typeof data === 'string' && data.trim()) return data
  if (data && typeof data === 'object') {
    const o = data as { title?: string; detail?: string; message?: string }
    return o.detail ?? o.message ?? o.title ?? err.message
  }
  return err.message
}

function rethrowAsUserError(e: unknown): never {
  if (isAxiosError(e)) throw new Error(messageFromAxiosError(e))
  if (e instanceof Error) throw e
  throw new Error(String(e))
}

export function getApiErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export async function fetchOrders(): Promise<OrderDto[]> {
  try {
    const { data } = await api.get<OrderDto[]>('/api/orders')
    return data
  } catch (e) {
    rethrowAsUserError(e)
  }
}

export async function fetchOrderById(id: number): Promise<OrderDto> {
  try {
    const { data } = await api.get<OrderDto>(`/api/orders/${id}`)
    return data
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 404) throw new Error('Заказ не найден')
    rethrowAsUserError(e)
  }
}

export async function createOrder(payload: CreateOrderDto): Promise<OrderDto> {
  try {
    const { data } = await api.post<OrderDto>('/api/orders', payload)
    return data
  } catch (e) {
    rethrowAsUserError(e)
  }
}

export interface OrderDto {
  id: number
  orderNumber: string
  senderCity: string
  senderAddress: string
  recipientCity: string
  recipientAddress: string
  weight: number
  pickupDate: string
}

export interface CreateOrderDto {
  senderCity: string
  senderAddress: string
  recipientCity: string
  recipientAddress: string
  weight: number
  pickupDate: string
}

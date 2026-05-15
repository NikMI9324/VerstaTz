import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchOrders, getApiErrorMessage, type OrderDto } from '../api/ordersApi'
import './OrderListPage.css'

function formatDate(isoDate: string) {
  if (!isoDate) return '—'
  const [y, m, d] = isoDate.split('-')
  if (!y || !m || !d) return isoDate
  return `${d}.${m}.${y}`
}

export default function OrderListPage() {
  const [orders, setOrders] = useState<OrderDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await fetchOrders()
        if (!cancelled) setOrders(data)
      } catch (e) {
        if (!cancelled) setError(getApiErrorMessage(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <p className="order-list-page__status">Загрузка…</p>
  if (error) return <p className="order-list-page__error">{error}</p>

  if (orders.length === 0) {
    return <p className="order-list-page__empty">Заказов пока нет. Создайте первый заказ.</p>
  }

  return (
    <section className="order-list-page">
      <h1 className="order-list-page__title">Список заказов</h1>
      <div className="order-list-page__table-wrap">
        <table className="order-list-page__table">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Город отправителя</th>
              <th>Адрес отправителя</th>
              <th>Город получателя</th>
              <th>Адрес получателя</th>
              <th>Вес, кг</th>
              <th>Дата забора</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  <Link className="order-list-page__link" to={`/orders/${o.id}`}>
                    {o.orderNumber || '—'}
                  </Link>
                </td>
                <td>{o.senderCity}</td>
                <td>{o.senderAddress}</td>
                <td>{o.recipientCity}</td>
                <td>{o.recipientAddress}</td>
                <td>{o.weight}</td>
                <td>{formatDate(o.pickupDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

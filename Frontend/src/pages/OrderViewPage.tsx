import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById, getApiErrorMessage, type OrderDto } from "../api/ordersApi";
import "./OrderViewPage.css";

function formatDate(isoDate: string) {
  if (!isoDate) return "-";
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${d}.${m}.${y}`;
}

export default function OrderViewPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = id ?? "";
    const numId = Number.parseInt(raw, 10);
    const safeId = Number.isFinite(numId) && numId > 0 ? numId : 0;

    let cancelled = false;
    (async () => {
      try {
        const data = await fetchOrderById(safeId);
        if (!cancelled) setOrder(data);
      } catch (e) {
        if (!cancelled) setError(getApiErrorMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p className="order-view-page__status">Загрузка…</p>;
  if (error) {
    return (
      <section className="order-view-page">
        <p className="order-view-page__error">{error}</p>
        <Link className="order-view-page__back" to="/">
          К списку заказов
        </Link>
      </section>
    );
  }
  if (!order) return null;

  return (
    <section className="order-view-page">
      <h1 className="order-view-page__title">Заказ {order.orderNumber}</h1>
      <dl className="order-view-page__dl">
        <dt>Номер заказа</dt>
        <dd>{order.orderNumber}</dd>
        <dt>Город отправителя</dt>
        <dd>{order.senderCity}</dd>
        <dt>Адрес отправителя</dt>
        <dd>{order.senderAddress}</dd>
        <dt>Город получателя</dt>
        <dd>{order.recipientCity}</dd>
        <dt>Адрес получателя</dt>
        <dd>{order.recipientAddress}</dd>
        <dt>Вес груза, кг</dt>
        <dd>{order.weight}</dd>
        <dt>Дата забора груза</dt>
        <dd>{formatDate(order.pickupDate)}</dd>
      </dl>
      <Link className="order-view-page__back" to="/">
        К списку заказов
      </Link>
    </section>
  );
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder, getApiErrorMessage } from '../api/ordersApi'
import './OrderCreatePage.css'

const empty = {
  senderCity: '',
  senderAddress: '',
  recipientCity: '',
  recipientAddress: '',
  weight: '',
  pickupDate: '',
}

/** Принимает «дд.мм.гггг», возвращает «yyyy-MM-dd» или null. */
function parseDdMmYyyyToIso(raw: string): string | null {
  const s = raw.trim()
  const m = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(s)
  if (!m) return null
  const day = Number(m[1])
  const month = Number(m[2])
  const year = Number(m[3])
  if (month < 1 || month > 12 || day < 1 || day > 31) return null
  const dt = new Date(year, month - 1, day)
  if (
    dt.getFullYear() !== year ||
    dt.getMonth() !== month - 1 ||
    dt.getDate() !== day
  ) {
    return null
  }
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function isoToDdMmYyyy(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return ''
  return `${m[3]}.${m[2]}.${m[1]}`
}

export default function OrderCreatePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [dateDraft, setDateDraft] = useState('')
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof typeof empty>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setServerError(null)
  }

  function commitDateDraft() {
    const raw = dateDraft.trim()
    if (!raw) {
      update('pickupDate', '')
      return
    }
    const iso = parseDdMmYyyyToIso(raw)
    if (!iso) {
      if (form.pickupDate) setDateDraft(isoToDdMmYyyy(form.pickupDate))
      else setDateDraft('')
      return
    }
    update('pickupDate', iso)
    setDateDraft(isoToDdMmYyyy(iso))
  }

  function resolvePickupDateForSubmit(): string {
    const raw = dateDraft.trim()
    if (!raw) return ''
    return parseDdMmYyyyToIso(raw) ?? form.pickupDate
  }

  async function submitOrder() {
    setServerError(null)

    const w = Number(form.weight.replace(',', '.'))
    const weight = Number.isFinite(w) ? w : 0
    const pickupDate = resolvePickupDateForSubmit()

    setSubmitting(true)
    try {
      const created = await createOrder({
        senderCity: form.senderCity,
        senderAddress: form.senderAddress,
        recipientCity: form.recipientCity,
        recipientAddress: form.recipientAddress,
        weight,
        pickupDate,
      })
      navigate(`/orders/${created.id}`)
    } catch (err) {
      setServerError(getApiErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="order-create-page">
      <h1 className="order-create-page__title">Новый заказ</h1>
      <form
        className="order-create-page__form"
        onSubmit={(e) => {
          e.preventDefault()
          void submitOrder()
        }}
      >
        <label className="order-create-page__field">
          <span className="order-create-page__label">Город отправителя</span>
          <input
            className="order-create-page__input"
            value={form.senderCity}
            onChange={(e) => update('senderCity', e.target.value)}
            required
          />
        </label>
        <label className="order-create-page__field">
          <span className="order-create-page__label">Адрес отправителя</span>
          <input
            className="order-create-page__input"
            value={form.senderAddress}
            onChange={(e) => update('senderAddress', e.target.value)}
            required
          />
        </label>
        <label className="order-create-page__field">
          <span className="order-create-page__label">Город получателя</span>
          <input
            className="order-create-page__input"
            value={form.recipientCity}
            onChange={(e) => update('recipientCity', e.target.value)}
            required
          />
        </label>
        <label className="order-create-page__field">
          <span className="order-create-page__label">Адрес получателя</span>
          <input
            className="order-create-page__input"
            value={form.recipientAddress}
            onChange={(e) => update('recipientAddress', e.target.value)}
            required
          />
        </label>
        <label className="order-create-page__field">
          <span className="order-create-page__label">Вес груза, кг</span>
          <input
            className="order-create-page__input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={form.weight}
            onChange={(e) => update('weight', e.target.value)}
            required
          />
        </label>
        <label className="order-create-page__field">
          <span className="order-create-page__label">Дата забора груза</span>
          <input
            className="order-create-page__input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="дд.мм.гггг"
            value={dateDraft}
            onChange={(e) => setDateDraft(e.target.value)}
            onBlur={() => commitDateDraft()}
            required
          />
        </label>

        {serverError && <p className="order-create-page__err">{serverError}</p>}

        <button className="order-create-page__submit" type="submit" disabled={submitting}>
          {submitting ? 'Отправка…' : 'Создать заказ'}
        </button>
      </form>
    </div>
  )
}

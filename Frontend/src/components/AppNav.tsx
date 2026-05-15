import { NavLink } from 'react-router-dom'
import './AppNav.css'

export default function AppNav() {
  return (
    <nav className="app-nav">
      <span className="app-nav__brand">Доставка грузов</span>
      <NavLink className="app-nav__link" to="/" end>
        Список заказов
      </NavLink>
      <NavLink className="app-nav__link" to="/orders/new">
        Новый заказ
      </NavLink>
    </nav>
  )
}

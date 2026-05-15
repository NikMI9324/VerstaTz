import { Routes, Route } from 'react-router-dom'
import AppNav from './components/AppNav'
import OrderListPage from './pages/OrderListPage'
import OrderCreatePage from './pages/OrderCreatePage'
import OrderViewPage from './pages/OrderViewPage'
import './App.css'

function App() {
  return (
    <div className="app-root">
      <AppNav />
      <main className="app-root__main">
        <Routes>
          <Route path="/" element={<OrderListPage />} />
          <Route path="/orders/new" element={<OrderCreatePage />} />
          <Route path="/orders/:id" element={<OrderViewPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

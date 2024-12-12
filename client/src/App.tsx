import Contact from './pages/Contact'
import OpenAccount from './pages/OpenAccount'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HistoryDetail from './components/HistoryDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aboutus' element={<Contact />} />
        <Route path='/getstarted' element={<OpenAccount />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/history/:id' element={<HistoryDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
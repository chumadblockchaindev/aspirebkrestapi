import Contact from './pages/Contact'
import OpenAccount from './pages/OpenAccount'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import HistoryDetail from './components/HistoryDetail'
import AdminLogin from './pages/AdminLogin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserDetail from './components/UserDetail'

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
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/userdetail/:id' element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Premios from './pages/Premios'
import Login from './pages/Login'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premios" element={<Premios />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default App 
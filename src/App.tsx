import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Premios from './pages/Premios'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Layout from './components/Layout'
import { AuthProvider } from './auth/AuthContext.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';


function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/premios" element={<Premios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App 
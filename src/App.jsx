import './App.css'

import { AuthProvider } from './Contexts/Auth'

import { Router } from './Routes/index'

import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App

import './App.css'

import { AuthProvider } from './Contexts/Auth'

import { Router } from './Routes/index'

import { BrowserRouter } from 'react-router-dom'

import { ToastProvider } from 'react-toast-notifications'


function App() {
  return (
  <ToastProvider>
  <AuthProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AuthProvider>
  </ToastProvider>
  )
}

export default App

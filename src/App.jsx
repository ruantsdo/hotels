import './App.css'

import { AuthProvider } from './Contexts/Auth'
import { AppRoutes } from './Routes/index'
import { ToastProvider } from 'react-toast-notifications'


function App() {
  return (
  <ToastProvider>
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  </ToastProvider>
  )
}

export default App

import React from 'react'

import { AuthProvider } from '../hooks/AuthContext'
import { ToastProvider } from '../hooks/ToastContext'

 const appProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      {children}
    </ToastProvider>
  </AuthProvider>
)

export default appProvider

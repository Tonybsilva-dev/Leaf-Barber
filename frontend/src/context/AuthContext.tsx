import React, { createContext, useCallback } from 'react'
import api from '../services/api'

interface SignInCredenticals {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredenticals): Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {

  const signIn = useCallback( async ({ email, password }) => {
    //Para fazermos a autenticação precisamos receber as credenciais
    const response = await api.post('/sessions', {
      email,
      password
    })

    console.log(response)
  }, [])


  return (
    <AuthContext.Provider value={{ name: 'Tony', signIn }}>
      {children}
    </AuthContext.Provider>
  )
}


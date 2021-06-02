import React from 'react';
import GlobalStyles from './styles/global'
import { AuthProvider } from './hooks/AuthContext'
import SingIn from './pages/SignIn'

import ToastContainer from  './components/ToastContainer'

// import { Container } from './styles';
//Componente por volta dos componentes que devem ter acesso ao contexto de aplicação

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyles />
  </>
)

export default App;

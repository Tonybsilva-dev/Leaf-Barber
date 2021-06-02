import React from 'react';
import GlobalStyles from './styles/global'
import { AuthProvider } from './context/AuthContext'
import SingIn from './pages/SignIn'

// import { Container } from './styles';
//Componente por volta dos componentes que devem ter acesso ao contexto de aplicação

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
    </AuthProvider>
    <GlobalStyles />
  </>
)

export default App;

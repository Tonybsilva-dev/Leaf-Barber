import React from 'react';
import GlobalStyles from './styles/global'
import AuthContext from './context/AuthContext'
import SingIn from './pages/SignIn'

// import { Container } from './styles';
//Componente por volta dos componentes que devem ter acesso ao contexto de aplicação

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Tony' }}>
      <SingIn />
    </AuthContext.Provider>
    <GlobalStyles />
  </>
)

export default App;

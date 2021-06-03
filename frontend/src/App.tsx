import React from 'react';
import GlobalStyles from './styles/global'
import AppProvider from './hooks/index'

import SingIn from './pages/SignIn'

// import { Container } from './styles';

//Componente por volta dos componentes que devem ter acesso ao contexto de aplicação

const App: React.FC = () => (
  <>
    <AppProvider>
      <SingIn />
    </AppProvider>
    <GlobalStyles />
  </>
)

export default App;

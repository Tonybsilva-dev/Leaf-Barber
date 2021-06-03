import React from 'react';
import GlobalStyles from './styles/global'
import AppProvider from './hooks/index'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

// import { Container } from './styles';

//Componente por volta dos componentes que devem ter acesso ao contexto de aplicação

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
        <Routes />
    </AppProvider>
    <GlobalStyles />
  </BrowserRouter>
)

export default App;

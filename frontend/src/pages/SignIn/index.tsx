import React from 'react'
import logo from '../../assets/logo.svg'
import { Container, Content, Background } from './styles';
import { FiLogIn } from 'react-icons/fi'
const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="logo" />
      <form>
        <h1>Faça seu logon</h1>
        <input type="text" name="" id="" placeholder="Email" />
        <input type="password" name="" id="" placeholder="Senha"/>
        <button type="submit">Entrar</button>

        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="login">
        <FiLogIn />
        Criar conta
        </a>
    </Content>

    <Background />
  </Container>
)

export default SignIn;

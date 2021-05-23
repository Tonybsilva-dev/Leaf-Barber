import React from 'react'
import logo from '../../assets/logo.svg'
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'


import Input from '../../components/Input';
import Button from '../../components/Button'


const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="logo" />
      <form>
        <h1>Faça seu logon</h1>
        <Input type="text" name="email" id="" placeholder="Email" icon={FiMail} autoComplete="off" />
        <Input type="password" name="password" id="" placeholder="Senha" icon={FiLock} autoComplete="off" />
        <Button type="submit">Entrar</Button>

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

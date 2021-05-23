import React from 'react'
import logo from '../../assets/logo.svg'
import { Container, Content, Background } from './styles';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi'


import Input from '../../components/Input';
import Button from '../../components/Button'


const SignUn: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="logo" />
      <form>
        <h1>Faça seu cadastro</h1>
        <Input type="text" name="name" id="" placeholder="Nome Completo" icon={FiUser} autoComplete="off" />
        <Input type="text" name="email" id="" placeholder="Email" icon={FiMail} autoComplete="off" />
        <Input type="password" name="password" id="" placeholder="Senha" icon={FiLock} autoComplete="off" />
        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="logon">
        <FiArrowLeft />
        Voltar para logon
        </a>
    </Content>
  </Container>
)

export default SignUn;

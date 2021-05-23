import React, { useCallback } from 'react'
import logo from '../../assets/logo.svg'
import { Container, Content, Background } from './styles';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi'

import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from '../../components/Input';
import Button from '../../components/Button'


const SignUn: React.FC = () => {

  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'A senha precisa ter no mínimo 6 caracteres')
      })
      await schema.validate(data, {
        abortEarly: false
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="logo" />
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input type="text" name="name" placeholder="Nome Completo" icon={FiUser} autoComplete="off" />
          <Input type="text" name="email" placeholder="Email" icon={FiMail} autoComplete="off" />
          <Input type="password" name="password" placeholder="Senha" icon={FiLock} autoComplete="off" />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="logon">
          <FiArrowLeft />
        Voltar para logon
        </a>
      </Content>
    </Container>
  )
}
export default SignUn;

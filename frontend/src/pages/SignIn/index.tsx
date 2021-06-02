import React, { useRef, useCallback } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/Input';
import Button from '../../components/Button'


interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const { signIn, user } = useAuth()
  console.log(user)

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      signIn({
        email: data.email,
        password: data.password
      })
    } catch (error) {

      if ( error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
      }
      // Disparar um Toast

    }
  }, [signIn])

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <Form onSubmit={handleSubmit} ref={formRef} >
          <h1>Faça seu logon</h1>
          <Input type="text" name="email" id="email" placeholder="Email" icon={FiMail} autoComplete="off" />
          <Input type="password" name="password" id="password" placeholder="Senha" icon={FiLock} autoComplete="off" />
          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn />
        Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn;

import React, { useRef, useCallback, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/Input';
import Button from '../../components/Button'


const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const auth = useContext(AuthContext)
  console.log(auth)

  const handleSubmit = useCallback(async (data: object) => {
    try {

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória')
      })
      await schema.validate(data, {
        abortEarly: false
      })


    } catch (error) {
      console.log(error)

      const errors = getValidationErrors(error)
      formRef.current?.setErrors(errors)
    }
  }, [])

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <Form onSubmit={handleSubmit} ref={formRef} >
          <h1>Faça seu logon</h1>
          <Input type="text" name="email" id="" placeholder="Email" icon={FiMail} autoComplete="off" />
          <Input type="password" name="password" id="" placeholder="Senha" icon={FiLock} autoComplete="off" />
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

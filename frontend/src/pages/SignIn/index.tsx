import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';
import { Background, Container, Content, AnimationContainer } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth()
  const { addToast } = useToast()



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

      await signIn({
        email: data.email,
        password: data.password
      })

      addToast({
        title: 'FEITO',
        type: 'success',
        description: 'Usuário conectado com sucesso.'
      });
    } catch (error) {

      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)

        return
      }
      // Disparar um Toast
      addToast({
        title: 'ERRO',
        type: 'error',
        description: 'Desculpe, não conseguimos encontrar uma conta com essas credenciais, tente novamente.'
      });
    }
  }, [signIn, addToast])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="logo" />
          <Form onSubmit={handleSubmit} ref={formRef} >
            <h1>Faça seu logon</h1>
            <Input type="text" name="email" id="email" placeholder="Email" icon={FiMail} autoComplete="off" />
            <Input type="password" name="password" id="password" placeholder="Senha" icon={FiLock} autoComplete="off" />
            <Button type="submit">Entrar</Button>

            <Link to="forgot">Esqueci minha senha</Link>
          </Form>
          <Link to="/signUp">
            <FiLogIn />
        Criar conta
        </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn;

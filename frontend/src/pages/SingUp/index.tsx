import React, { useCallback, useRef } from 'react'
import logo from '../../assets/logo.svg'
import { Container, Content, Background, AnimationContainer } from './styles';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/Input';
import Button from '../../components/Button'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { useToast } from '../../hooks/ToastContext'

interface SignUpFormData {
  nome: string;
  email: string;
  password: string
}

const SignUn: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'A senha precisa ter no mínimo 6 caracteres')
      })
      await schema.validate(data, {
        abortEarly: false
      })

      await api.post('/users', data)

      history.push('/')

      addToast({
        title: 'Cadastro realizado!',
        type: "success",
        description: 'realize seu login agora!'
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)

        return
      }
      // Disparar um Toast
      addToast({
        title: 'Erro no cadastro',
        type: 'error',
        description: 'Desculpe, não conseguimos criar um usuário para você.'
      });
    }
  }, [addToast, history])

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input type="text" name="name" placeholder="Nome Completo" icon={FiUser} autoComplete="off" />
            <Input type="text" name="email" placeholder="Email" icon={FiMail} autoComplete="off" />
            <Input type="password" name="password" placeholder="Senha" icon={FiLock} autoComplete="off" />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
        Voltar para logon
        </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}
export default SignUn;

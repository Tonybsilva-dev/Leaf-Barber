import styled from 'styled-components'
import SingInBackgroundIMG from '../../assets/sign-in-background.png'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1{
      margin: 24px;
    }

    input{
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #FFFFFF;

      &::placeholder{
        color: #636660;
      }

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #FF9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312E38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover{
        background: ${shade(0.2, '#FF9000')}
      }
    }

    a {
      color: #F4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover{
        color: ${shade(0.2, '#F4EDE8')};
      }
    }
  } > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
      &:hover{
        color: ${shade(0.2, '#FF9000')};
      }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${SingInBackgroundIMG}) no-repeat center;
  background-size: cover;
`

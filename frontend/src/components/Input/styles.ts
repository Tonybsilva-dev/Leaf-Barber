import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
      background: #232129;
      border-radius: 10px;
      padding: 16px;
      width: 100%;
      display: flex;
      align-items: center;

      border: 2px solid #232129;
      color: #636660;

      & + div {
        margin-top: 8px;
      }

      ${props => props.isFocused && css`
      color: #FF9000;
      border-color: #FF9000;
      `}

      ${props => props.isFilled && css`
      color: #FF9000;
      `}

input{
      background: transparent;
      flex: 1;
      border: 0;
      color: #FFFFFF;

      &::placeholder{
        color: #636660;
      }

    }
    > svg {
         margin-right: 16px;
      }

`

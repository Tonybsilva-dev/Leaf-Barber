import React from 'react';
import Toast from './Toast'
import { Container } from './styles';
import { ToastMessage } from '../../hooks/ToastContext'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container >
      {messages.map(item => (
        <Toast
          key={item.id}
          item={item}>
        </Toast>
      ))}
    </Container>
  );
}

export default ToastContainer;

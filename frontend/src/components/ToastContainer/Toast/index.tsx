import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/ToastContext'

interface ToastProps {
  item: ToastMessage,
  style: object
}

const icons = {
  info: <FiInfo size={24}/>,
  error: <FiAlertCircle size={24}/>,
  success: <FiCheckCircle size={24}/>,
}

const Toast: React.FC<ToastProps> = ({ item, style }) => {

  const { removeToast } = useToast()

// Remover automaticamente os toasts após 3 segundos
useEffect(() => {
  const timer = setTimeout( () => {
    removeToast(item.id);
  }, 3000);

  return () => {
    clearTimeout(timer)
  }

}, [item.id, removeToast])

  return (
    <Container
    type={item.type}
    hasDescription={!!item.description}
    style={style}
    >

      {icons[item.type || 'info']}

      <div>
        <strong>{item.title}</strong>
        {item.description && <p>{item.description}</p>}
      </div>

      <button onClick={() => removeToast(item.id)} type="button" >
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast;

import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'
import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => {
  return (
  <Container >
    <Toast type="info" hasDescription>
    <FiAlertCircle size={20}/>

    <div>
      <strong>Info</strong>
      <p>Não foi possível fazer login na aplicação</p>
    </div>

    <button type="button" >
      <FiXCircle size={18} />
    </button>
    </Toast>

    <Toast type="success" hasDescription={false}>
    <FiAlertCircle size={20}/>

    <div>
      <strong>Sucesso</strong>
      {/* <p>Sua conta foi criada com sucesso.</p> */}
    </div>

    <button type="button" >
      <FiXCircle size={18} />
    </button>
    </Toast>


    <Toast type="error" hasDescription>
    <FiAlertCircle size={20}/>

    <div>
      <strong>Erro</strong>
      <p>Não foi possível fazer login na aplicação</p>
    </div>

    <button type="button" >
      <FiXCircle size={18} />
    </button>
    </Toast>
  </Container>
  );
}

export default ToastContainer;
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import 'express-async-errors';
import routes from './routes';
import UploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();
app.use(cors())
app.use(express.json());


// ========== FUNCTIONS ==========

/* Middleware para log de requisições.
Bom para saber qual rota o usuário está, e que tipo de requisição ela faz.
Aqui ela traz o método e a url acessada. */

function logRequests(request: Request, response: Response, next: NextFunction) {
  const { method, url } = request;
  console.log('==========')
  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.log(logLabel);
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
  console.log('==========')
}

// ========== END FUNCTIONS ==========
//Rota de log de requisições
app.use(logRequests)
//Essa rota serve para mostrar as imagens do browser pelo nome salvo
app.use('/files', express.static(UploadConfig.directory))
//Aquivo de rotas gerais
app.use(routes);

//Middleware de tratativas de erros globais
app.use((err: Error, request: any, response: Response, next: NextFunction) => {

  //Verificamos se é um erro da instacia de AppError, pois se for, é um erro que
  //foi originado pela aplicação, um erro que eu conheço


  //Aqui basicamente dizemos:
  //Se eu conheço esse erro, se ele é original da minha aplicação, quero então
  //devolve-lo de uma maneira 'amigável' no frontend
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  //Caso não seja, retornaremos um erro interno de servidor
  //Um erro de API não esperado
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })
});

const port = 3002

app.listen({ port }, () => {
  console.log(`🚀 Server started on port ${port}!`)
})

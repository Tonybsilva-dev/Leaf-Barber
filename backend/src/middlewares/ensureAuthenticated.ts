import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';
import AppError from '../errors/AppError'

interface TokenPayload{
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: any, response: Response, next: NextFunction): void {
  //Validação do tokenJWT
  //Pega o token passado no header
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError('❌ JWT token is missing!', 401)
  }
  //Separa o Bearer do token com a desestruturação
  const [, token] = authHeader.split(' ')
  
  try {
    //Verifica se o token é válido
    const decoded = verify(token, AuthConfig.jwt.secret);

    //Forçamos o tipo de uma variável para levar informações do usuário para as rotas que virão
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub
    }

    //Deixa prosseguir para a página
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
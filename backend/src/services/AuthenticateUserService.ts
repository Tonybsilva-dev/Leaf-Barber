import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '../models/User'
import AuthConfig from '../config/auth'
import AppError from '../errors/AppError'

interface Request {
  email: string,
  password: string,
}

interface Response{
  user: User,
  token: string,
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    /* Criando um Token com assinatura
    1 - Primeiro parâmetro - Informações que podem ser usadas do usuário (Não coloque credenciais)
    esse parametro chama-se Payload e pode ser descriptografado (Cuidado)
    ex: Permissions, name, id
    2 - Segundo parâmetro - Um segredo que só nossa aplicação conhece.
    O segredo usado foi gerado pelo www.md5.cz, após escolher minha paralavra secreta.
    3 - Terceiro parâmetro - configurações do Token
    */

    //Desestruturação do arquivo de configurações de Autenticação
    const { secret, expiresIn } = AuthConfig.jwt

    const token = sign({}, secret, {
      //Para saber a qual usuário pertence o token gerado
      subject: user.id,
      //Quanto tempo o usuário vai ficar logado
      expiresIn: expiresIn,
    });

    return {
      user,
      token
    }

  }
}

export default AuthenticateUserService;
import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
const sessionsRouter = Router();

//Rota responsável por criar um usuário
sessionsRouter.post('/', async (request, response) => {

    //Requisita os dados necessários para logar
    const { email, password } = request.body
    //inicia o seviço de autenticação
    const autheticateUser = new AuthenticateUserService();

    //Passamos o dados do usuário pelo serviço para verificar credenciais
    const { user, token } = await autheticateUser.execute({
      email,
      password,
    })
    //Retiramos o password do response
    delete user.password;
    //Retorna o usuário logado
    return response.json({ user, token })
});

export default sessionsRouter;
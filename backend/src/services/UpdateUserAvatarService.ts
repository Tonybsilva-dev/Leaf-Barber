import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError'
import User from '../models/User';
import path from 'path';
import fs from 'fs';


interface Request{
  user_id: string,
  avatarFileName: string
}

class UpdatedUserAvatarService{
  public async execute({ user_id,  avatarFileName }: Request): Promise<User>{
    //Iniciamos baseado no model de User
    const usersRepository = getRepository(User)

    //Verifica se é um usuário válido
    const user = await usersRepository.findOne(user_id)

    //Caso não seja, ele cai nesse erro
    if(!user){
      throw new AppError('Only authenticaded users can change avatar.', 401)
    }

    //Verifica se o usuário ja tinha um avatar, daí deletamos.
    if(user.avatar){
      //Buscamos pelo arquivo de avatar do usuário, 
      //escolhemos onde será salvo, e qual o avatar que deverá ser removido.
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      
      //Verificamos se o arquivo existe
      //Aqui usamos o fs do Node como promisse e co a função stat
      //verificamos o status do arquivo, porém, só se ele existir
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      //Se o arquivo existe...
      if(userAvatarFileExists){
        //Deletamos ele passando o unlink e o caminho onde ele se encontra
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    //Pegamos a instância do usuário
    user.avatar = avatarFileName;
    //Salvamos diretamente
    await usersRepository.save(user)

    return user;

  }
}

export default UpdatedUserAvatarService;
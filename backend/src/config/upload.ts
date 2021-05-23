import path from 'path'
import multer from 'multer'
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    //Rota onde ficará o upload das imagens
    //A pasta uploads não será enviada pro git, mas a temporária sim. (.gitignore)
    destination: tmpFolder,
    filename(request, file, callback) {
      //Manter o nome dos arquivos únicos
      //Criar um hash de 10 bytes aleatórios convertidos em string hexadecimal
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}
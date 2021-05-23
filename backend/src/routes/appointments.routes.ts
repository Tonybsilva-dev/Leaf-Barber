import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();


//Faz com que todas as rotas desse arquivo passem por autenticação do token
appointmentsRouter.use(ensureAuthenticated)
//Rota para obter agendamentos
appointmentsRouter.get('/', async (request: any, response: Response) => {
  
  // console.log(request.user.id)

  //Pegamos um repositório para funções personalizadas
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  //Buscamos todos os agendamentos
  const appointments = await appointmentsRepository.find();
  //Retornamos todos os agendamentos
  return response.json(appointments)
});

//Rota para criar um agendamento
appointmentsRouter.post('/', async (request: Request, response: Response) => {

    //Dados necessários para criar um agendamento
    const { provider_id, date } = request.body;
    //Convertendo a Data
    const parsedDate = parseISO(date);
    //Inicializamos o seviço de criação de agendamento
    const createAppointment = new CreateAppointmentService();
    //Salvamos a instancia dos dados
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });
    //Retornamos o agendamento
    return response.json(appointment);
});

export default appointmentsRouter;

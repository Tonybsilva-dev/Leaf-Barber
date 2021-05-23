import { Request } from './express.d';

declare namespace Express{
  export interface Request{
    user: {
      id: string;
    };
  }
}
import {Roles} from './roles';

export class User {
  id?: string;
  password: string;
  username: string;
  role: Roles[];
  token?: string;
}

export interface PizzaError {
  data: any;
  code: number;
  msg: string;
}

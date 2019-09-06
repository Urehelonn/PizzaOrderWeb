import {Roles} from './roles';

export class User {
  id?: string;
  username: string;
  role: Roles;
  token?: string;
}

export interface PizzaError {
  data: any;
  code: number;
  msg: string;
}

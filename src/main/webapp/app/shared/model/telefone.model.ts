import { ICliente } from '@/shared/model/cliente.model';
import { IMotorista } from '@/shared/model/motorista.model';

export interface ITelefone {
  id?: number;
  numero?: string;
  cliente?: ICliente | null;
  motorista?: IMotorista | null;
}

export class Telefone implements ITelefone {
  constructor(public id?: number, public numero?: string, public cliente?: ICliente | null, public motorista?: IMotorista | null) {}
}

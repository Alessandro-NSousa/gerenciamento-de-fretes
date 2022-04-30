import { ICliente } from '@/shared/model/cliente.model';
import { ICidade } from '@/shared/model/cidade.model';
import { IMotorista } from '@/shared/model/motorista.model';
import { ICaminhao } from '@/shared/model/caminhao.model';

export interface IFrete {
  id?: number;
  data?: Date | null;
  prazoDeEntrega?: number | null;
  valor?: number | null;
  cliente?: ICliente | null;
  cidade?: ICidade | null;
  motorista?: IMotorista | null;
  caminhao?: ICaminhao | null;
}

export class Frete implements IFrete {
  constructor(
    public id?: number,
    public data?: Date | null,
    public prazoDeEntrega?: number | null,
    public valor?: number | null,
    public cliente?: ICliente | null,
    public cidade?: ICidade | null,
    public motorista?: IMotorista | null,
    public caminhao?: ICaminhao | null
  ) {}
}

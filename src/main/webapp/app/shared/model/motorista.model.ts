import { Sexo } from '@/shared/model/enumerations/sexo.model';
export interface IMotorista {
  id?: number;
  nome?: string;
  cnh?: string;
  validadeCnh?: Date | null;
  genero?: Sexo | null;
}

export class Motorista implements IMotorista {
  constructor(
    public id?: number,
    public nome?: string,
    public cnh?: string,
    public validadeCnh?: Date | null,
    public genero?: Sexo | null
  ) {}
}

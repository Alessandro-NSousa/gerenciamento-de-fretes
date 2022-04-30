import { IEndereco } from '@/shared/model/endereco.model';

export interface ICliente {
  id?: number;
  nome?: string;
  cnpj?: string;
  endereco?: IEndereco | null;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public nome?: string, public cnpj?: string, public endereco?: IEndereco | null) {}
}

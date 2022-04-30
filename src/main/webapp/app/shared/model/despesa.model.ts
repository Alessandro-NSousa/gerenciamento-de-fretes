import { Tipo } from '@/shared/model/enumerations/tipo.model';
export interface IDespesa {
  id?: number;
  tipoDespesa?: Tipo | null;
  descricao?: string;
  valor?: number | null;
}

export class Despesa implements IDespesa {
  constructor(public id?: number, public tipoDespesa?: Tipo | null, public descricao?: string, public valor?: number | null) {}
}

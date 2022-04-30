import { Uf } from '@/shared/model/enumerations/uf.model';
export interface ICidade {
  id?: number;
  nome?: string;
  uf?: Uf | null;
}

export class Cidade implements ICidade {
  constructor(public id?: number, public nome?: string, public uf?: Uf | null) {}
}

import { IFrete } from '@/shared/model/frete.model';
import { IDespesa } from '@/shared/model/despesa.model';

export interface IViagem {
  id?: number;
  previsaoDeEntrega?: Date | null;
  entregueNoPrazo?: boolean | null;
  previsaoDeRetorno?: Date | null;
  frete?: IFrete | null;
  despesa?: IDespesa | null;
}

export class Viagem implements IViagem {
  constructor(
    public id?: number,
    public previsaoDeEntrega?: Date | null,
    public entregueNoPrazo?: boolean | null,
    public previsaoDeRetorno?: Date | null,
    public frete?: IFrete | null,
    public despesa?: IDespesa | null
  ) {
    this.entregueNoPrazo = this.entregueNoPrazo ?? false;
  }
}

export interface ICaminhao {
  id?: number;
  marca?: string | null;
  placa?: string;
  ano?: string | null;
  cargaTotal?: number | null;
}

export class Caminhao implements ICaminhao {
  constructor(
    public id?: number,
    public marca?: string | null,
    public placa?: string,
    public ano?: string | null,
    public cargaTotal?: number | null
  ) {}
}

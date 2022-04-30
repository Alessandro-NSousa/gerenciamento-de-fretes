export interface IEndereco {
  id?: number;
  cep?: string;
  logradouro?: string;
  complemento?: string | null;
  numero?: number | null;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public cep?: string,
    public logradouro?: string,
    public complemento?: string | null,
    public numero?: number | null
  ) {}
}

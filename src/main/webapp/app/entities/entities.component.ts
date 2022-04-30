import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import ClienteService from './cliente/cliente.service';
import MotoristaService from './motorista/motorista.service';
import EnderecoService from './endereco/endereco.service';
import TelefoneService from './telefone/telefone.service';
import CidadeService from './cidade/cidade.service';
import DespesaService from './despesa/despesa.service';
import ViagemService from './viagem/viagem.service';
import FreteService from './frete/frete.service';
import CaminhaoService from './caminhao/caminhao.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('clienteService') private clienteService = () => new ClienteService();
  @Provide('motoristaService') private motoristaService = () => new MotoristaService();
  @Provide('enderecoService') private enderecoService = () => new EnderecoService();
  @Provide('telefoneService') private telefoneService = () => new TelefoneService();
  @Provide('cidadeService') private cidadeService = () => new CidadeService();
  @Provide('despesaService') private despesaService = () => new DespesaService();
  @Provide('viagemService') private viagemService = () => new ViagemService();
  @Provide('freteService') private freteService = () => new FreteService();
  @Provide('caminhaoService') private caminhaoService = () => new CaminhaoService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}

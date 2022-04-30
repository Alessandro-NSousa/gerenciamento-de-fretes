import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Cliente = () => import('@/entities/cliente/cliente.vue');
// prettier-ignore
const ClienteUpdate = () => import('@/entities/cliente/cliente-update.vue');
// prettier-ignore
const ClienteDetails = () => import('@/entities/cliente/cliente-details.vue');
// prettier-ignore
const Motorista = () => import('@/entities/motorista/motorista.vue');
// prettier-ignore
const MotoristaUpdate = () => import('@/entities/motorista/motorista-update.vue');
// prettier-ignore
const MotoristaDetails = () => import('@/entities/motorista/motorista-details.vue');
// prettier-ignore
const Endereco = () => import('@/entities/endereco/endereco.vue');
// prettier-ignore
const EnderecoUpdate = () => import('@/entities/endereco/endereco-update.vue');
// prettier-ignore
const EnderecoDetails = () => import('@/entities/endereco/endereco-details.vue');
// prettier-ignore
const Telefone = () => import('@/entities/telefone/telefone.vue');
// prettier-ignore
const TelefoneUpdate = () => import('@/entities/telefone/telefone-update.vue');
// prettier-ignore
const TelefoneDetails = () => import('@/entities/telefone/telefone-details.vue');
// prettier-ignore
const Cidade = () => import('@/entities/cidade/cidade.vue');
// prettier-ignore
const CidadeUpdate = () => import('@/entities/cidade/cidade-update.vue');
// prettier-ignore
const CidadeDetails = () => import('@/entities/cidade/cidade-details.vue');
// prettier-ignore
const Despesa = () => import('@/entities/despesa/despesa.vue');
// prettier-ignore
const DespesaUpdate = () => import('@/entities/despesa/despesa-update.vue');
// prettier-ignore
const DespesaDetails = () => import('@/entities/despesa/despesa-details.vue');
// prettier-ignore
const Viagem = () => import('@/entities/viagem/viagem.vue');
// prettier-ignore
const ViagemUpdate = () => import('@/entities/viagem/viagem-update.vue');
// prettier-ignore
const ViagemDetails = () => import('@/entities/viagem/viagem-details.vue');
// prettier-ignore
const Frete = () => import('@/entities/frete/frete.vue');
// prettier-ignore
const FreteUpdate = () => import('@/entities/frete/frete-update.vue');
// prettier-ignore
const FreteDetails = () => import('@/entities/frete/frete-details.vue');
// prettier-ignore
const Caminhao = () => import('@/entities/caminhao/caminhao.vue');
// prettier-ignore
const CaminhaoUpdate = () => import('@/entities/caminhao/caminhao-update.vue');
// prettier-ignore
const CaminhaoDetails = () => import('@/entities/caminhao/caminhao-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'cliente',
      name: 'Cliente',
      component: Cliente,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cliente/new',
      name: 'ClienteCreate',
      component: ClienteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cliente/:clienteId/edit',
      name: 'ClienteEdit',
      component: ClienteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cliente/:clienteId/view',
      name: 'ClienteView',
      component: ClienteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'motorista',
      name: 'Motorista',
      component: Motorista,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'motorista/new',
      name: 'MotoristaCreate',
      component: MotoristaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'motorista/:motoristaId/edit',
      name: 'MotoristaEdit',
      component: MotoristaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'motorista/:motoristaId/view',
      name: 'MotoristaView',
      component: MotoristaDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'endereco',
      name: 'Endereco',
      component: Endereco,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'endereco/new',
      name: 'EnderecoCreate',
      component: EnderecoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'endereco/:enderecoId/edit',
      name: 'EnderecoEdit',
      component: EnderecoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'endereco/:enderecoId/view',
      name: 'EnderecoView',
      component: EnderecoDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'telefone',
      name: 'Telefone',
      component: Telefone,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'telefone/new',
      name: 'TelefoneCreate',
      component: TelefoneUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'telefone/:telefoneId/edit',
      name: 'TelefoneEdit',
      component: TelefoneUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'telefone/:telefoneId/view',
      name: 'TelefoneView',
      component: TelefoneDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cidade',
      name: 'Cidade',
      component: Cidade,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cidade/new',
      name: 'CidadeCreate',
      component: CidadeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cidade/:cidadeId/edit',
      name: 'CidadeEdit',
      component: CidadeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cidade/:cidadeId/view',
      name: 'CidadeView',
      component: CidadeDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'despesa',
      name: 'Despesa',
      component: Despesa,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'despesa/new',
      name: 'DespesaCreate',
      component: DespesaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'despesa/:despesaId/edit',
      name: 'DespesaEdit',
      component: DespesaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'despesa/:despesaId/view',
      name: 'DespesaView',
      component: DespesaDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'viagem',
      name: 'Viagem',
      component: Viagem,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'viagem/new',
      name: 'ViagemCreate',
      component: ViagemUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'viagem/:viagemId/edit',
      name: 'ViagemEdit',
      component: ViagemUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'viagem/:viagemId/view',
      name: 'ViagemView',
      component: ViagemDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'frete',
      name: 'Frete',
      component: Frete,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'frete/new',
      name: 'FreteCreate',
      component: FreteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'frete/:freteId/edit',
      name: 'FreteEdit',
      component: FreteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'frete/:freteId/view',
      name: 'FreteView',
      component: FreteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caminhao',
      name: 'Caminhao',
      component: Caminhao,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caminhao/new',
      name: 'CaminhaoCreate',
      component: CaminhaoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caminhao/:caminhaoId/edit',
      name: 'CaminhaoEdit',
      component: CaminhaoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'caminhao/:caminhaoId/view',
      name: 'CaminhaoView',
      component: CaminhaoDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};

import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import ClienteService from '@/entities/cliente/cliente.service';
import { ICliente } from '@/shared/model/cliente.model';

import CidadeService from '@/entities/cidade/cidade.service';
import { ICidade } from '@/shared/model/cidade.model';

import MotoristaService from '@/entities/motorista/motorista.service';
import { IMotorista } from '@/shared/model/motorista.model';

import CaminhaoService from '@/entities/caminhao/caminhao.service';
import { ICaminhao } from '@/shared/model/caminhao.model';

import { IFrete, Frete } from '@/shared/model/frete.model';
import FreteService from './frete.service';

const validations: any = {
  frete: {
    data: {},
    prazoDeEntrega: {},
    valor: {},
  },
};

@Component({
  validations,
})
export default class FreteUpdate extends Vue {
  @Inject('freteService') private freteService: () => FreteService;
  @Inject('alertService') private alertService: () => AlertService;

  public frete: IFrete = new Frete();

  @Inject('clienteService') private clienteService: () => ClienteService;

  public clientes: ICliente[] = [];

  @Inject('cidadeService') private cidadeService: () => CidadeService;

  public cidades: ICidade[] = [];

  @Inject('motoristaService') private motoristaService: () => MotoristaService;

  public motoristas: IMotorista[] = [];

  @Inject('caminhaoService') private caminhaoService: () => CaminhaoService;

  public caminhaos: ICaminhao[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.freteId) {
        vm.retrieveFrete(to.params.freteId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.frete.id) {
      this.freteService()
        .update(this.frete)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.frete.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.freteService()
        .create(this.frete)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.frete.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveFrete(freteId): void {
    this.freteService()
      .find(freteId)
      .then(res => {
        this.frete = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.clienteService()
      .retrieve()
      .then(res => {
        this.clientes = res.data;
      });
    this.cidadeService()
      .retrieve()
      .then(res => {
        this.cidades = res.data;
      });
    this.motoristaService()
      .retrieve()
      .then(res => {
        this.motoristas = res.data;
      });
    this.caminhaoService()
      .retrieve()
      .then(res => {
        this.caminhaos = res.data;
      });
  }
}

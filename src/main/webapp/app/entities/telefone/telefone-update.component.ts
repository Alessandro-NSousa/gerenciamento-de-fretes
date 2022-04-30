import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ClienteService from '@/entities/cliente/cliente.service';
import { ICliente } from '@/shared/model/cliente.model';

import MotoristaService from '@/entities/motorista/motorista.service';
import { IMotorista } from '@/shared/model/motorista.model';

import { ITelefone, Telefone } from '@/shared/model/telefone.model';
import TelefoneService from './telefone.service';

const validations: any = {
  telefone: {
    numero: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TelefoneUpdate extends Vue {
  @Inject('telefoneService') private telefoneService: () => TelefoneService;
  @Inject('alertService') private alertService: () => AlertService;

  public telefone: ITelefone = new Telefone();

  @Inject('clienteService') private clienteService: () => ClienteService;

  public clientes: ICliente[] = [];

  @Inject('motoristaService') private motoristaService: () => MotoristaService;

  public motoristas: IMotorista[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.telefoneId) {
        vm.retrieveTelefone(to.params.telefoneId);
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
    if (this.telefone.id) {
      this.telefoneService()
        .update(this.telefone)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.telefone.updated', { param: param.id });
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
      this.telefoneService()
        .create(this.telefone)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.telefone.created', { param: param.id });
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

  public retrieveTelefone(telefoneId): void {
    this.telefoneService()
      .find(telefoneId)
      .then(res => {
        this.telefone = res;
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
    this.motoristaService()
      .retrieve()
      .then(res => {
        this.motoristas = res.data;
      });
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { IMotorista, Motorista } from '@/shared/model/motorista.model';
import MotoristaService from './motorista.service';
import { Sexo } from '@/shared/model/enumerations/sexo.model';

const validations: any = {
  motorista: {
    nome: {
      required,
    },
    cnh: {
      required,
    },
    validadeCnh: {},
    genero: {},
  },
};

@Component({
  validations,
})
export default class MotoristaUpdate extends Vue {
  @Inject('motoristaService') private motoristaService: () => MotoristaService;
  @Inject('alertService') private alertService: () => AlertService;

  public motorista: IMotorista = new Motorista();
  public sexoValues: string[] = Object.keys(Sexo);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.motoristaId) {
        vm.retrieveMotorista(to.params.motoristaId);
      }
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
    if (this.motorista.id) {
      this.motoristaService()
        .update(this.motorista)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.motorista.updated', { param: param.id });
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
      this.motoristaService()
        .create(this.motorista)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.motorista.created', { param: param.id });
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

  public retrieveMotorista(motoristaId): void {
    this.motoristaService()
      .find(motoristaId)
      .then(res => {
        this.motorista = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { IDespesa, Despesa } from '@/shared/model/despesa.model';
import DespesaService from './despesa.service';
import { Tipo } from '@/shared/model/enumerations/tipo.model';

const validations: any = {
  despesa: {
    tipoDespesa: {},
    descricao: {
      required,
    },
    valor: {},
  },
};

@Component({
  validations,
})
export default class DespesaUpdate extends Vue {
  @Inject('despesaService') private despesaService: () => DespesaService;
  @Inject('alertService') private alertService: () => AlertService;

  public despesa: IDespesa = new Despesa();
  public tipoValues: string[] = Object.keys(Tipo);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.despesaId) {
        vm.retrieveDespesa(to.params.despesaId);
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
    if (this.despesa.id) {
      this.despesaService()
        .update(this.despesa)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.despesa.updated', { param: param.id });
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
      this.despesaService()
        .create(this.despesa)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.despesa.created', { param: param.id });
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

  public retrieveDespesa(despesaId): void {
    this.despesaService()
      .find(despesaId)
      .then(res => {
        this.despesa = res;
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

import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { ICaminhao, Caminhao } from '@/shared/model/caminhao.model';
import CaminhaoService from './caminhao.service';

const validations: any = {
  caminhao: {
    marca: {},
    placa: {
      required,
    },
    ano: {},
    cargaTotal: {},
  },
};

@Component({
  validations,
})
export default class CaminhaoUpdate extends Vue {
  @Inject('caminhaoService') private caminhaoService: () => CaminhaoService;
  @Inject('alertService') private alertService: () => AlertService;

  public caminhao: ICaminhao = new Caminhao();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.caminhaoId) {
        vm.retrieveCaminhao(to.params.caminhaoId);
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
    if (this.caminhao.id) {
      this.caminhaoService()
        .update(this.caminhao)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.caminhao.updated', { param: param.id });
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
      this.caminhaoService()
        .create(this.caminhao)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.caminhao.created', { param: param.id });
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

  public retrieveCaminhao(caminhaoId): void {
    this.caminhaoService()
      .find(caminhaoId)
      .then(res => {
        this.caminhao = res;
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

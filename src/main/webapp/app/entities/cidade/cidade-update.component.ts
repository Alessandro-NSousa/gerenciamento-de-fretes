import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { ICidade, Cidade } from '@/shared/model/cidade.model';
import CidadeService from './cidade.service';
import { Uf } from '@/shared/model/enumerations/uf.model';

const validations: any = {
  cidade: {
    nome: {
      required,
    },
    uf: {},
  },
};

@Component({
  validations,
})
export default class CidadeUpdate extends Vue {
  @Inject('cidadeService') private cidadeService: () => CidadeService;
  @Inject('alertService') private alertService: () => AlertService;

  public cidade: ICidade = new Cidade();
  public ufValues: string[] = Object.keys(Uf);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cidadeId) {
        vm.retrieveCidade(to.params.cidadeId);
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
    if (this.cidade.id) {
      this.cidadeService()
        .update(this.cidade)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.cidade.updated', { param: param.id });
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
      this.cidadeService()
        .create(this.cidade)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.cidade.created', { param: param.id });
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

  public retrieveCidade(cidadeId): void {
    this.cidadeService()
      .find(cidadeId)
      .then(res => {
        this.cidade = res;
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

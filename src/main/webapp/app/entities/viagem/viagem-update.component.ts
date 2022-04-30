import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import FreteService from '@/entities/frete/frete.service';
import { IFrete } from '@/shared/model/frete.model';

import DespesaService from '@/entities/despesa/despesa.service';
import { IDespesa } from '@/shared/model/despesa.model';

import { IViagem, Viagem } from '@/shared/model/viagem.model';
import ViagemService from './viagem.service';

const validations: any = {
  viagem: {
    previsaoDeEntrega: {},
    entregueNoPrazo: {},
    previsaoDeRetorno: {},
  },
};

@Component({
  validations,
})
export default class ViagemUpdate extends Vue {
  @Inject('viagemService') private viagemService: () => ViagemService;
  @Inject('alertService') private alertService: () => AlertService;

  public viagem: IViagem = new Viagem();

  @Inject('freteService') private freteService: () => FreteService;

  public fretes: IFrete[] = [];

  @Inject('despesaService') private despesaService: () => DespesaService;

  public despesas: IDespesa[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.viagemId) {
        vm.retrieveViagem(to.params.viagemId);
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
    if (this.viagem.id) {
      this.viagemService()
        .update(this.viagem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.viagem.updated', { param: param.id });
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
      this.viagemService()
        .create(this.viagem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('freightSystemApp.viagem.created', { param: param.id });
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

  public retrieveViagem(viagemId): void {
    this.viagemService()
      .find(viagemId)
      .then(res => {
        this.viagem = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.freteService()
      .retrieve()
      .then(res => {
        this.fretes = res.data;
      });
    this.despesaService()
      .retrieve()
      .then(res => {
        this.despesas = res.data;
      });
  }
}

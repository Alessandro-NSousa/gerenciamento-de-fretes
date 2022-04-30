import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDespesa } from '@/shared/model/despesa.model';

import DespesaService from './despesa.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Despesa extends Vue {
  @Inject('despesaService') private despesaService: () => DespesaService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public despesas: IDespesa[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllDespesas();
  }

  public clear(): void {
    this.retrieveAllDespesas();
  }

  public retrieveAllDespesas(): void {
    this.isFetching = true;
    this.despesaService()
      .retrieve()
      .then(
        res => {
          this.despesas = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IDespesa): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeDespesa(): void {
    this.despesaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('freightSystemApp.despesa.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllDespesas();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

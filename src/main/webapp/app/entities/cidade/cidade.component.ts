import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICidade } from '@/shared/model/cidade.model';

import CidadeService from './cidade.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Cidade extends Vue {
  @Inject('cidadeService') private cidadeService: () => CidadeService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public cidades: ICidade[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCidades();
  }

  public clear(): void {
    this.retrieveAllCidades();
  }

  public retrieveAllCidades(): void {
    this.isFetching = true;
    this.cidadeService()
      .retrieve()
      .then(
        res => {
          this.cidades = res.data;
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

  public prepareRemove(instance: ICidade): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCidade(): void {
    this.cidadeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('freightSystemApp.cidade.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCidades();
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

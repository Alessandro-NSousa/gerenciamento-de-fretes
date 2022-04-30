import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IFrete } from '@/shared/model/frete.model';

import FreteService from './frete.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Frete extends Vue {
  @Inject('freteService') private freteService: () => FreteService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public fretes: IFrete[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllFretes();
  }

  public clear(): void {
    this.retrieveAllFretes();
  }

  public retrieveAllFretes(): void {
    this.isFetching = true;
    this.freteService()
      .retrieve()
      .then(
        res => {
          this.fretes = res.data;
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

  public prepareRemove(instance: IFrete): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeFrete(): void {
    this.freteService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('freightSystemApp.frete.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllFretes();
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

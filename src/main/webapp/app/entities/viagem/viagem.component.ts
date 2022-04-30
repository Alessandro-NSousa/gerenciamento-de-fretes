import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IViagem } from '@/shared/model/viagem.model';

import ViagemService from './viagem.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Viagem extends Vue {
  @Inject('viagemService') private viagemService: () => ViagemService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public viagems: IViagem[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllViagems();
  }

  public clear(): void {
    this.retrieveAllViagems();
  }

  public retrieveAllViagems(): void {
    this.isFetching = true;
    this.viagemService()
      .retrieve()
      .then(
        res => {
          this.viagems = res.data;
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

  public prepareRemove(instance: IViagem): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeViagem(): void {
    this.viagemService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('freightSystemApp.viagem.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllViagems();
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

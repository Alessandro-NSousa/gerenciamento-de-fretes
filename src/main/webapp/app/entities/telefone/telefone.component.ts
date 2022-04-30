import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITelefone } from '@/shared/model/telefone.model';

import TelefoneService from './telefone.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Telefone extends Vue {
  @Inject('telefoneService') private telefoneService: () => TelefoneService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public telefones: ITelefone[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTelefones();
  }

  public clear(): void {
    this.retrieveAllTelefones();
  }

  public retrieveAllTelefones(): void {
    this.isFetching = true;
    this.telefoneService()
      .retrieve()
      .then(
        res => {
          this.telefones = res.data;
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

  public prepareRemove(instance: ITelefone): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTelefone(): void {
    this.telefoneService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('freightSystemApp.telefone.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllTelefones();
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

import { Component, Vue, Inject } from 'vue-property-decorator';

import { IViagem } from '@/shared/model/viagem.model';
import ViagemService from './viagem.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ViagemDetails extends Vue {
  @Inject('viagemService') private viagemService: () => ViagemService;
  @Inject('alertService') private alertService: () => AlertService;

  public viagem: IViagem = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.viagemId) {
        vm.retrieveViagem(to.params.viagemId);
      }
    });
  }

  public retrieveViagem(viagemId) {
    this.viagemService()
      .find(viagemId)
      .then(res => {
        this.viagem = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

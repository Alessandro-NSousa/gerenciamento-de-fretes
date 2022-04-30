import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMotorista } from '@/shared/model/motorista.model';
import MotoristaService from './motorista.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class MotoristaDetails extends Vue {
  @Inject('motoristaService') private motoristaService: () => MotoristaService;
  @Inject('alertService') private alertService: () => AlertService;

  public motorista: IMotorista = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.motoristaId) {
        vm.retrieveMotorista(to.params.motoristaId);
      }
    });
  }

  public retrieveMotorista(motoristaId) {
    this.motoristaService()
      .find(motoristaId)
      .then(res => {
        this.motorista = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

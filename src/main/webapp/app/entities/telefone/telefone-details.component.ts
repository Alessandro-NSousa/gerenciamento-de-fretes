import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITelefone } from '@/shared/model/telefone.model';
import TelefoneService from './telefone.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TelefoneDetails extends Vue {
  @Inject('telefoneService') private telefoneService: () => TelefoneService;
  @Inject('alertService') private alertService: () => AlertService;

  public telefone: ITelefone = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.telefoneId) {
        vm.retrieveTelefone(to.params.telefoneId);
      }
    });
  }

  public retrieveTelefone(telefoneId) {
    this.telefoneService()
      .find(telefoneId)
      .then(res => {
        this.telefone = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

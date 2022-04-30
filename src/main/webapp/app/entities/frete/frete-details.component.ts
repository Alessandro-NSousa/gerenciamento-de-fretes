import { Component, Vue, Inject } from 'vue-property-decorator';

import { IFrete } from '@/shared/model/frete.model';
import FreteService from './frete.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class FreteDetails extends Vue {
  @Inject('freteService') private freteService: () => FreteService;
  @Inject('alertService') private alertService: () => AlertService;

  public frete: IFrete = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.freteId) {
        vm.retrieveFrete(to.params.freteId);
      }
    });
  }

  public retrieveFrete(freteId) {
    this.freteService()
      .find(freteId)
      .then(res => {
        this.frete = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { IDespesa } from '@/shared/model/despesa.model';
import DespesaService from './despesa.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class DespesaDetails extends Vue {
  @Inject('despesaService') private despesaService: () => DespesaService;
  @Inject('alertService') private alertService: () => AlertService;

  public despesa: IDespesa = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.despesaId) {
        vm.retrieveDespesa(to.params.despesaId);
      }
    });
  }

  public retrieveDespesa(despesaId) {
    this.despesaService()
      .find(despesaId)
      .then(res => {
        this.despesa = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

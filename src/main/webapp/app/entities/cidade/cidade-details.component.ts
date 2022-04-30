import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICidade } from '@/shared/model/cidade.model';
import CidadeService from './cidade.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CidadeDetails extends Vue {
  @Inject('cidadeService') private cidadeService: () => CidadeService;
  @Inject('alertService') private alertService: () => AlertService;

  public cidade: ICidade = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cidadeId) {
        vm.retrieveCidade(to.params.cidadeId);
      }
    });
  }

  public retrieveCidade(cidadeId) {
    this.cidadeService()
      .find(cidadeId)
      .then(res => {
        this.cidade = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

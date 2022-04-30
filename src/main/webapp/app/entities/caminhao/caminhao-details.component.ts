import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICaminhao } from '@/shared/model/caminhao.model';
import CaminhaoService from './caminhao.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CaminhaoDetails extends Vue {
  @Inject('caminhaoService') private caminhaoService: () => CaminhaoService;
  @Inject('alertService') private alertService: () => AlertService;

  public caminhao: ICaminhao = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.caminhaoId) {
        vm.retrieveCaminhao(to.params.caminhaoId);
      }
    });
  }

  public retrieveCaminhao(caminhaoId) {
    this.caminhaoService()
      .find(caminhaoId)
      .then(res => {
        this.caminhao = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

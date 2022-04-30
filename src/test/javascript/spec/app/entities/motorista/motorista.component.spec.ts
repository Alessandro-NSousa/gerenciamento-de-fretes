/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MotoristaComponent from '@/entities/motorista/motorista.vue';
import MotoristaClass from '@/entities/motorista/motorista.component';
import MotoristaService from '@/entities/motorista/motorista.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Motorista Management Component', () => {
    let wrapper: Wrapper<MotoristaClass>;
    let comp: MotoristaClass;
    let motoristaServiceStub: SinonStubbedInstance<MotoristaService>;

    beforeEach(() => {
      motoristaServiceStub = sinon.createStubInstance<MotoristaService>(MotoristaService);
      motoristaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MotoristaClass>(MotoristaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          motoristaService: () => motoristaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      motoristaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMotoristas();
      await comp.$nextTick();

      // THEN
      expect(motoristaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.motoristas[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      motoristaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(motoristaServiceStub.retrieve.callCount).toEqual(1);

      comp.removeMotorista();
      await comp.$nextTick();

      // THEN
      expect(motoristaServiceStub.delete.called).toBeTruthy();
      expect(motoristaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

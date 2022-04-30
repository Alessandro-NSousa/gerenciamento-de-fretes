/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import DespesaComponent from '@/entities/despesa/despesa.vue';
import DespesaClass from '@/entities/despesa/despesa.component';
import DespesaService from '@/entities/despesa/despesa.service';
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
  describe('Despesa Management Component', () => {
    let wrapper: Wrapper<DespesaClass>;
    let comp: DespesaClass;
    let despesaServiceStub: SinonStubbedInstance<DespesaService>;

    beforeEach(() => {
      despesaServiceStub = sinon.createStubInstance<DespesaService>(DespesaService);
      despesaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<DespesaClass>(DespesaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          despesaService: () => despesaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      despesaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllDespesas();
      await comp.$nextTick();

      // THEN
      expect(despesaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.despesas[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      despesaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(despesaServiceStub.retrieve.callCount).toEqual(1);

      comp.removeDespesa();
      await comp.$nextTick();

      // THEN
      expect(despesaServiceStub.delete.called).toBeTruthy();
      expect(despesaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

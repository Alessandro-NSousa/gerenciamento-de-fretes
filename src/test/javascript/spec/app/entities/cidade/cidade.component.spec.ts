/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CidadeComponent from '@/entities/cidade/cidade.vue';
import CidadeClass from '@/entities/cidade/cidade.component';
import CidadeService from '@/entities/cidade/cidade.service';
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
  describe('Cidade Management Component', () => {
    let wrapper: Wrapper<CidadeClass>;
    let comp: CidadeClass;
    let cidadeServiceStub: SinonStubbedInstance<CidadeService>;

    beforeEach(() => {
      cidadeServiceStub = sinon.createStubInstance<CidadeService>(CidadeService);
      cidadeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CidadeClass>(CidadeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          cidadeService: () => cidadeServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      cidadeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCidades();
      await comp.$nextTick();

      // THEN
      expect(cidadeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.cidades[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      cidadeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(cidadeServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCidade();
      await comp.$nextTick();

      // THEN
      expect(cidadeServiceStub.delete.called).toBeTruthy();
      expect(cidadeServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

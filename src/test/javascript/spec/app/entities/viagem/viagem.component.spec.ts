/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ViagemComponent from '@/entities/viagem/viagem.vue';
import ViagemClass from '@/entities/viagem/viagem.component';
import ViagemService from '@/entities/viagem/viagem.service';
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
  describe('Viagem Management Component', () => {
    let wrapper: Wrapper<ViagemClass>;
    let comp: ViagemClass;
    let viagemServiceStub: SinonStubbedInstance<ViagemService>;

    beforeEach(() => {
      viagemServiceStub = sinon.createStubInstance<ViagemService>(ViagemService);
      viagemServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ViagemClass>(ViagemComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          viagemService: () => viagemServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      viagemServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllViagems();
      await comp.$nextTick();

      // THEN
      expect(viagemServiceStub.retrieve.called).toBeTruthy();
      expect(comp.viagems[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      viagemServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(viagemServiceStub.retrieve.callCount).toEqual(1);

      comp.removeViagem();
      await comp.$nextTick();

      // THEN
      expect(viagemServiceStub.delete.called).toBeTruthy();
      expect(viagemServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

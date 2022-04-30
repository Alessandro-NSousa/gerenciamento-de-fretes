/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import FreteComponent from '@/entities/frete/frete.vue';
import FreteClass from '@/entities/frete/frete.component';
import FreteService from '@/entities/frete/frete.service';
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
  describe('Frete Management Component', () => {
    let wrapper: Wrapper<FreteClass>;
    let comp: FreteClass;
    let freteServiceStub: SinonStubbedInstance<FreteService>;

    beforeEach(() => {
      freteServiceStub = sinon.createStubInstance<FreteService>(FreteService);
      freteServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<FreteClass>(FreteComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          freteService: () => freteServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      freteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllFretes();
      await comp.$nextTick();

      // THEN
      expect(freteServiceStub.retrieve.called).toBeTruthy();
      expect(comp.fretes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      freteServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(freteServiceStub.retrieve.callCount).toEqual(1);

      comp.removeFrete();
      await comp.$nextTick();

      // THEN
      expect(freteServiceStub.delete.called).toBeTruthy();
      expect(freteServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

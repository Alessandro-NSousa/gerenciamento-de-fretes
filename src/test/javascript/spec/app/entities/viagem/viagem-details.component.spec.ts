/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ViagemDetailComponent from '@/entities/viagem/viagem-details.vue';
import ViagemClass from '@/entities/viagem/viagem-details.component';
import ViagemService from '@/entities/viagem/viagem.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Viagem Management Detail Component', () => {
    let wrapper: Wrapper<ViagemClass>;
    let comp: ViagemClass;
    let viagemServiceStub: SinonStubbedInstance<ViagemService>;

    beforeEach(() => {
      viagemServiceStub = sinon.createStubInstance<ViagemService>(ViagemService);

      wrapper = shallowMount<ViagemClass>(ViagemDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { viagemService: () => viagemServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundViagem = { id: 123 };
        viagemServiceStub.find.resolves(foundViagem);

        // WHEN
        comp.retrieveViagem(123);
        await comp.$nextTick();

        // THEN
        expect(comp.viagem).toBe(foundViagem);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundViagem = { id: 123 };
        viagemServiceStub.find.resolves(foundViagem);

        // WHEN
        comp.beforeRouteEnter({ params: { viagemId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.viagem).toBe(foundViagem);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});

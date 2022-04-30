/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import FreteDetailComponent from '@/entities/frete/frete-details.vue';
import FreteClass from '@/entities/frete/frete-details.component';
import FreteService from '@/entities/frete/frete.service';
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
  describe('Frete Management Detail Component', () => {
    let wrapper: Wrapper<FreteClass>;
    let comp: FreteClass;
    let freteServiceStub: SinonStubbedInstance<FreteService>;

    beforeEach(() => {
      freteServiceStub = sinon.createStubInstance<FreteService>(FreteService);

      wrapper = shallowMount<FreteClass>(FreteDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { freteService: () => freteServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundFrete = { id: 123 };
        freteServiceStub.find.resolves(foundFrete);

        // WHEN
        comp.retrieveFrete(123);
        await comp.$nextTick();

        // THEN
        expect(comp.frete).toBe(foundFrete);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundFrete = { id: 123 };
        freteServiceStub.find.resolves(foundFrete);

        // WHEN
        comp.beforeRouteEnter({ params: { freteId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.frete).toBe(foundFrete);
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

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CidadeDetailComponent from '@/entities/cidade/cidade-details.vue';
import CidadeClass from '@/entities/cidade/cidade-details.component';
import CidadeService from '@/entities/cidade/cidade.service';
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
  describe('Cidade Management Detail Component', () => {
    let wrapper: Wrapper<CidadeClass>;
    let comp: CidadeClass;
    let cidadeServiceStub: SinonStubbedInstance<CidadeService>;

    beforeEach(() => {
      cidadeServiceStub = sinon.createStubInstance<CidadeService>(CidadeService);

      wrapper = shallowMount<CidadeClass>(CidadeDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { cidadeService: () => cidadeServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCidade = { id: 123 };
        cidadeServiceStub.find.resolves(foundCidade);

        // WHEN
        comp.retrieveCidade(123);
        await comp.$nextTick();

        // THEN
        expect(comp.cidade).toBe(foundCidade);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCidade = { id: 123 };
        cidadeServiceStub.find.resolves(foundCidade);

        // WHEN
        comp.beforeRouteEnter({ params: { cidadeId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.cidade).toBe(foundCidade);
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

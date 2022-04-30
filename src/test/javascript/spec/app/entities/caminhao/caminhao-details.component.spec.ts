/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CaminhaoDetailComponent from '@/entities/caminhao/caminhao-details.vue';
import CaminhaoClass from '@/entities/caminhao/caminhao-details.component';
import CaminhaoService from '@/entities/caminhao/caminhao.service';
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
  describe('Caminhao Management Detail Component', () => {
    let wrapper: Wrapper<CaminhaoClass>;
    let comp: CaminhaoClass;
    let caminhaoServiceStub: SinonStubbedInstance<CaminhaoService>;

    beforeEach(() => {
      caminhaoServiceStub = sinon.createStubInstance<CaminhaoService>(CaminhaoService);

      wrapper = shallowMount<CaminhaoClass>(CaminhaoDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { caminhaoService: () => caminhaoServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCaminhao = { id: 123 };
        caminhaoServiceStub.find.resolves(foundCaminhao);

        // WHEN
        comp.retrieveCaminhao(123);
        await comp.$nextTick();

        // THEN
        expect(comp.caminhao).toBe(foundCaminhao);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCaminhao = { id: 123 };
        caminhaoServiceStub.find.resolves(foundCaminhao);

        // WHEN
        comp.beforeRouteEnter({ params: { caminhaoId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.caminhao).toBe(foundCaminhao);
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

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MotoristaDetailComponent from '@/entities/motorista/motorista-details.vue';
import MotoristaClass from '@/entities/motorista/motorista-details.component';
import MotoristaService from '@/entities/motorista/motorista.service';
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
  describe('Motorista Management Detail Component', () => {
    let wrapper: Wrapper<MotoristaClass>;
    let comp: MotoristaClass;
    let motoristaServiceStub: SinonStubbedInstance<MotoristaService>;

    beforeEach(() => {
      motoristaServiceStub = sinon.createStubInstance<MotoristaService>(MotoristaService);

      wrapper = shallowMount<MotoristaClass>(MotoristaDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { motoristaService: () => motoristaServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMotorista = { id: 123 };
        motoristaServiceStub.find.resolves(foundMotorista);

        // WHEN
        comp.retrieveMotorista(123);
        await comp.$nextTick();

        // THEN
        expect(comp.motorista).toBe(foundMotorista);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMotorista = { id: 123 };
        motoristaServiceStub.find.resolves(foundMotorista);

        // WHEN
        comp.beforeRouteEnter({ params: { motoristaId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.motorista).toBe(foundMotorista);
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

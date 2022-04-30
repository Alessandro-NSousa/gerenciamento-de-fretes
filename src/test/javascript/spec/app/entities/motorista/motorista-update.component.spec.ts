/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import MotoristaUpdateComponent from '@/entities/motorista/motorista-update.vue';
import MotoristaClass from '@/entities/motorista/motorista-update.component';
import MotoristaService from '@/entities/motorista/motorista.service';

import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Motorista Management Update Component', () => {
    let wrapper: Wrapper<MotoristaClass>;
    let comp: MotoristaClass;
    let motoristaServiceStub: SinonStubbedInstance<MotoristaService>;

    beforeEach(() => {
      motoristaServiceStub = sinon.createStubInstance<MotoristaService>(MotoristaService);

      wrapper = shallowMount<MotoristaClass>(MotoristaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          motoristaService: () => motoristaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.motorista = entity;
        motoristaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(motoristaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.motorista = entity;
        motoristaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(motoristaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMotorista = { id: 123 };
        motoristaServiceStub.find.resolves(foundMotorista);
        motoristaServiceStub.retrieve.resolves([foundMotorista]);

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

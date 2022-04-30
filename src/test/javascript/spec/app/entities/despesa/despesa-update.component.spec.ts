/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import DespesaUpdateComponent from '@/entities/despesa/despesa-update.vue';
import DespesaClass from '@/entities/despesa/despesa-update.component';
import DespesaService from '@/entities/despesa/despesa.service';

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
  describe('Despesa Management Update Component', () => {
    let wrapper: Wrapper<DespesaClass>;
    let comp: DespesaClass;
    let despesaServiceStub: SinonStubbedInstance<DespesaService>;

    beforeEach(() => {
      despesaServiceStub = sinon.createStubInstance<DespesaService>(DespesaService);

      wrapper = shallowMount<DespesaClass>(DespesaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          despesaService: () => despesaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.despesa = entity;
        despesaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(despesaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.despesa = entity;
        despesaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(despesaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundDespesa = { id: 123 };
        despesaServiceStub.find.resolves(foundDespesa);
        despesaServiceStub.retrieve.resolves([foundDespesa]);

        // WHEN
        comp.beforeRouteEnter({ params: { despesaId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.despesa).toBe(foundDespesa);
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

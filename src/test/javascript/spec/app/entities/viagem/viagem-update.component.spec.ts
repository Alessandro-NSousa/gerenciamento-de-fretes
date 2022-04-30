/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ViagemUpdateComponent from '@/entities/viagem/viagem-update.vue';
import ViagemClass from '@/entities/viagem/viagem-update.component';
import ViagemService from '@/entities/viagem/viagem.service';

import FreteService from '@/entities/frete/frete.service';

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
  describe('Viagem Management Update Component', () => {
    let wrapper: Wrapper<ViagemClass>;
    let comp: ViagemClass;
    let viagemServiceStub: SinonStubbedInstance<ViagemService>;

    beforeEach(() => {
      viagemServiceStub = sinon.createStubInstance<ViagemService>(ViagemService);

      wrapper = shallowMount<ViagemClass>(ViagemUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          viagemService: () => viagemServiceStub,
          alertService: () => new AlertService(),

          freteService: () =>
            sinon.createStubInstance<FreteService>(FreteService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          despesaService: () =>
            sinon.createStubInstance<DespesaService>(DespesaService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.viagem = entity;
        viagemServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(viagemServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.viagem = entity;
        viagemServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(viagemServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundViagem = { id: 123 };
        viagemServiceStub.find.resolves(foundViagem);
        viagemServiceStub.retrieve.resolves([foundViagem]);

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

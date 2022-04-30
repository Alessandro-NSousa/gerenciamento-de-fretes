/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import FreteUpdateComponent from '@/entities/frete/frete-update.vue';
import FreteClass from '@/entities/frete/frete-update.component';
import FreteService from '@/entities/frete/frete.service';

import ClienteService from '@/entities/cliente/cliente.service';

import CidadeService from '@/entities/cidade/cidade.service';

import MotoristaService from '@/entities/motorista/motorista.service';

import CaminhaoService from '@/entities/caminhao/caminhao.service';
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
  describe('Frete Management Update Component', () => {
    let wrapper: Wrapper<FreteClass>;
    let comp: FreteClass;
    let freteServiceStub: SinonStubbedInstance<FreteService>;

    beforeEach(() => {
      freteServiceStub = sinon.createStubInstance<FreteService>(FreteService);

      wrapper = shallowMount<FreteClass>(FreteUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          freteService: () => freteServiceStub,
          alertService: () => new AlertService(),

          clienteService: () =>
            sinon.createStubInstance<ClienteService>(ClienteService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          cidadeService: () =>
            sinon.createStubInstance<CidadeService>(CidadeService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          motoristaService: () =>
            sinon.createStubInstance<MotoristaService>(MotoristaService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          caminhaoService: () =>
            sinon.createStubInstance<CaminhaoService>(CaminhaoService, {
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
        comp.frete = entity;
        freteServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(freteServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.frete = entity;
        freteServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(freteServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundFrete = { id: 123 };
        freteServiceStub.find.resolves(foundFrete);
        freteServiceStub.retrieve.resolves([foundFrete]);

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

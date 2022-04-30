/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TelefoneUpdateComponent from '@/entities/telefone/telefone-update.vue';
import TelefoneClass from '@/entities/telefone/telefone-update.component';
import TelefoneService from '@/entities/telefone/telefone.service';

import ClienteService from '@/entities/cliente/cliente.service';

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
  describe('Telefone Management Update Component', () => {
    let wrapper: Wrapper<TelefoneClass>;
    let comp: TelefoneClass;
    let telefoneServiceStub: SinonStubbedInstance<TelefoneService>;

    beforeEach(() => {
      telefoneServiceStub = sinon.createStubInstance<TelefoneService>(TelefoneService);

      wrapper = shallowMount<TelefoneClass>(TelefoneUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          telefoneService: () => telefoneServiceStub,
          alertService: () => new AlertService(),

          clienteService: () =>
            sinon.createStubInstance<ClienteService>(ClienteService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          motoristaService: () =>
            sinon.createStubInstance<MotoristaService>(MotoristaService, {
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
        comp.telefone = entity;
        telefoneServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(telefoneServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.telefone = entity;
        telefoneServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(telefoneServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTelefone = { id: 123 };
        telefoneServiceStub.find.resolves(foundTelefone);
        telefoneServiceStub.retrieve.resolves([foundTelefone]);

        // WHEN
        comp.beforeRouteEnter({ params: { telefoneId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.telefone).toBe(foundTelefone);
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

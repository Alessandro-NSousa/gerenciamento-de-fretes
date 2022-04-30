/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CidadeUpdateComponent from '@/entities/cidade/cidade-update.vue';
import CidadeClass from '@/entities/cidade/cidade-update.component';
import CidadeService from '@/entities/cidade/cidade.service';

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
  describe('Cidade Management Update Component', () => {
    let wrapper: Wrapper<CidadeClass>;
    let comp: CidadeClass;
    let cidadeServiceStub: SinonStubbedInstance<CidadeService>;

    beforeEach(() => {
      cidadeServiceStub = sinon.createStubInstance<CidadeService>(CidadeService);

      wrapper = shallowMount<CidadeClass>(CidadeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          cidadeService: () => cidadeServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.cidade = entity;
        cidadeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cidadeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.cidade = entity;
        cidadeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cidadeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCidade = { id: 123 };
        cidadeServiceStub.find.resolves(foundCidade);
        cidadeServiceStub.retrieve.resolves([foundCidade]);

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

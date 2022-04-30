/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TelefoneDetailComponent from '@/entities/telefone/telefone-details.vue';
import TelefoneClass from '@/entities/telefone/telefone-details.component';
import TelefoneService from '@/entities/telefone/telefone.service';
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
  describe('Telefone Management Detail Component', () => {
    let wrapper: Wrapper<TelefoneClass>;
    let comp: TelefoneClass;
    let telefoneServiceStub: SinonStubbedInstance<TelefoneService>;

    beforeEach(() => {
      telefoneServiceStub = sinon.createStubInstance<TelefoneService>(TelefoneService);

      wrapper = shallowMount<TelefoneClass>(TelefoneDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { telefoneService: () => telefoneServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTelefone = { id: 123 };
        telefoneServiceStub.find.resolves(foundTelefone);

        // WHEN
        comp.retrieveTelefone(123);
        await comp.$nextTick();

        // THEN
        expect(comp.telefone).toBe(foundTelefone);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTelefone = { id: 123 };
        telefoneServiceStub.find.resolves(foundTelefone);

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

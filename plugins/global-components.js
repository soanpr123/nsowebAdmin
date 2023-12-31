import Vue from 'vue';
import Card from '@/components/shared/Card.vue';
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
import CurrencyInput from '@/components/shared/CurrencyInput.vue';
import DatePicker from '@/components/shared/DatePicker.vue';
import Pagination from '@/components/shared/Pagination.vue';
import PrintDialog from '@/components/shared/PrintDialog.vue';
import ContextMenu from '@/components/shared/contextMenu/ContextMenu.vue';

const components = [{
    name: 'ct-card',
    component: Card,
}, {
    name: 'ct-confirm-dialog',
    component: ConfirmDialog,
}, {
    name: 'ct-currency-input',
    component: CurrencyInput,
}, {
    name: 'ct-date-picker',
    component: DatePicker,
}, {
    name: 'ct-pagination',
    component: Pagination,
}, {
    name: 'ct-print-dialog',
    component: PrintDialog,
}, {
    name: 'ct-context-menu',
    component: ContextMenu,
}];

components.forEach(({ name, component }) => {
    Vue.component(name, component);
});

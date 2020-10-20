import Vue from 'vue';
import '../app/api/index';
import Layout from '../app/components/staff/layout/layout.vue';
import router from '../app/router';
import store from '../app/store';
import i18n from '../app/i18n';
import '../app/socket';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: (h) => h(Layout),
  }).$mount();
});

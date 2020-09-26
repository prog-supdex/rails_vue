import Vue from 'vue/dist/vue.js';
import LayoutStaffNavbar from 'layouts/staff/navbar';

console.log(LayoutStaffNavbar)

new Vue({
  el: '#layouts-staff-navbar',
  components: {
    'layouts-staff-navbar': LayoutStaffNavbar
  }
});

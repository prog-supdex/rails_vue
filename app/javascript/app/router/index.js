import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

import StaffClientList from '../components/staff/clients/list'
import StaffClientForm from '../components/staff/clients/form'

import StaffDashboard from '../components/staff/dashboard'

import StaffOrgList from '../components/staff/organizations/list'
import StaffOrgForm from '../components/staff/organizations/form'

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/staffs', component: StaffDashboard, name: 'staff_dashboard',
      children: [
        { path: '/staffs/clients', component: StaffClientList, name: 'staff_clients' },
        { path: '/staffs/clients/:id', component: StaffClientList, name: 'staff_client' },
        { path: '/staffs/organizations', component: StaffOrgList, name: 'staff_organizations' },
        { path: '/staffs/organizations/:id', component: StaffOrgList, name: 'staff_organizations' }
      ]
    }
  ]
})

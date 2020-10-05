import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/staffs',
      name: 'staff_dashboard',
      component: () => import('../components/staff/dashboard')
    },
    {
      path: '/staffs/clients',
      name: 'staff_clients',
      component: () => import('../components/staff/clients/list'),
      children: [
        { path: '/staffs/clients/:id', component: () => import('../components/staff/clients/form'), name: 'staff_client_form' }
      ],
    },
    {
      path: '/staffs/organizations/',
      name: 'staff_organizations',
      component: () => import('../components/staff/organizations/list'),
      children: [
        { path: '/staffs/organizations/:id', component: () =>  import('../components/staff/organizations/form'), name: 'staff_organization_form' }
      ],
    }
  ]
})

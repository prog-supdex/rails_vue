import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/staffs', redirect: '/staffs/organizations'
    },
    {
      path: '/clients', redirect: '/clients/organizations'
    },
    {
      path: '/clients/organizations/',
      name: 'client_organizations',
      component: () => import('../components/client/organization_list')
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
        { path: '/staffs/organizations/:id', component: () => import('../components/staff/organizations/form'), name: 'staff_organization_form' }
      ],
    },
    {
      path: '/staffs/equipments',
      name: 'staff_equipments',
      component: () => import('../components/staff/equipments/list'),
      children: [
        { path: '/staffs/equipments/:id', component: () => import('../components/staff/equipments/form'), name: 'staff_equipment_form' }
      ],
    },
  ]
})

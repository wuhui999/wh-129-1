import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    component: () => import('../layout/MainLayout.vue'),
    redirect: '/permits',
    children: [
      { path: 'permits', name: 'Permits', component: () => import('../views/Permits.vue'), meta: { title: '许可管理' } },
      { path: 'permits/create', name: 'PermitCreate', component: () => import('../views/PermitForm.vue'), meta: { title: '新建许可' } },
      { path: 'permits/:id', name: 'PermitDetail', component: () => import('../views/PermitDetail.vue'), meta: { title: '许可详情' } },
      { path: 'approvals', name: 'Approvals', component: () => import('../views/Approvals.vue'), meta: { title: '审批管理' } },
      { path: 'inspections', name: 'Inspections', component: () => import('../views/Inspections.vue'), meta: { title: '巡检管理' } },
      { path: 'inspections/create', name: 'InspectionCreate', component: () => import('../views/InspectionForm.vue'), meta: { title: '新建巡检' } },
      { path: 'hazards', name: 'Hazards', component: () => import('../views/Hazards.vue'), meta: { title: '隐患整改' } },
      { path: 'demolitions', name: 'Demolitions', component: () => import('../views/Demolitions.vue'), meta: { title: '拆除验收' } },
      { path: 'audit-logs', name: 'AuditLogs', component: () => import('../views/AuditLogs.vue'), meta: { title: '审计日志' } },
      { path: 'buildings', name: 'Buildings', component: () => import('../views/Buildings.vue'), meta: { title: '建筑管理' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !getToken()) {
    next('/login')
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/templates'
    },
    {
      path: '/templates',
      name: 'TemplateList',
      component: () => import('@/views/TemplateListView.vue')
    },
    {
      path: '/templates/new',
      name: 'TemplateNew',
      component: () => import('@/views/TemplateEditView.vue')
    },
    {
      path: '/templates/:id/edit',
      name: 'TemplateEdit',
      component: () => import('@/views/TemplateEditView.vue')
    },
    {
      path: '/templates/:id/preview',
      name: 'TemplatePreview',
      component: () => import('@/views/PreviewView.vue')
    },
    {
      path: '/presentations',
      name: 'PresentationList',
      component: () => import('@/views/PresentationListView.vue')
    },
    {
      path: '/assets',
      name: 'AssetManagement',
      component: () => import('@/views/AssetView.vue')
    }
  ]
})

export default router

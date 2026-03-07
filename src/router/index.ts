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
    },
    {
      path: '/theme',
      name: 'ThemeSettings',
      component: () => import('@/views/ThemeView.vue')
    },
    {
      path: '/templates/:id/export',
      name: 'TemplateExport',
      component: () => import('@/views/ExportView.vue')
    }
  ]
})

export default router

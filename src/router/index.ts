import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import ResumeView from '@/views/ResumeView/ResumeView.vue'
import ContactMeView from '@/views/ContactMeView/ContactMeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/resume',
            name: 'resume',
            component: ResumeView
        },

        {
            path: '/contact',
            name: 'contact',
            component: ContactMeView
        },
        {
            path: '/projects',
            name: 'projects',
            // route level code-splitting
            // this generates a separate chunk for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ProjectsView/ProjectsView.vue')
        }
    ]
})

export default router

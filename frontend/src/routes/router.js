import { createRouter, createWebHistory } from 'vue-router'
import Tree from '../components/Tree.vue'

const routes = [
    {
        path: '/',
        component: Tree
    },
    {
        path: '/:id',
        component: Tree,
        props: true
    }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router

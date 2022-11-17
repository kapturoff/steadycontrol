import { createRouter, createWebHistory } from 'vue-router'
import Tree from '../components/Tree.vue'

const routes = [
    {
        path: '/:id',
        component: Tree
    }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router

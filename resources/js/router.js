import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index.js'

/*
 |--------------------------------------------------------------------------
 | Views
 |--------------------------------------------------------------------------|
 */

// Layouts
import LayoutBasic from './views/layouts/LayoutBasic.vue'
import LayoutLogin from './views/layouts/LayoutLogin.vue'

// Auth
import Login from './views/auth/Login.vue'

import NotFoundPage from './views/errors/404.vue'

// Dashbord
import Dashboard from './views/dashboard/Dashboard.vue'

// Realisateurs
import realisateurIndex from './views/realisateurs/Index.vue'
import realisateurCreate from './views/realisateurs/Create.vue'

// Categories
import CategorieIndex from './views/categorie/Index.vue'
import CategorieCreate from './views/categorie/Create.vue'

// disques
import disqueIndex from './views/disques/Index.vue'
import disqueCreate from './views/disques/Create.vue'

// rayons
import rayonIndex from './views/rayons/Index.vue'
import rayonCreate from './views/rayons/Create.vue'


Vue.use(VueRouter)

const routes = [
    /*
     |--------------------------------------------------------------------------
     | Auth & Registration
     |--------------------------------------------------------------------------|
     */

    {
        path: '/',
        component: LayoutLogin,
        meta: {redirectIfAuthenticated: true},
        children: [
            {
                path: '/',
                component: Login,
            },
            {
                path: 'login',
                component: Login,
                name: 'login',
            }
        ],
    },
    /*
     |--------------------------------------------------------------------------
     | Admin
     |--------------------------------------------------------------------------|
     */
    {
        path: '/admin',
        component: LayoutBasic,
        meta: {requiresAuth: true},
        children: [
            // Dashboard
            {
                path: '/',
                component: Dashboard,
                name: 'dashboard',
            },
            {
                path: 'dashboard',
                component: Dashboard,
            },
            // realisateurs
            {
                path: 'realisateurs',
                component: realisateurIndex,
            },
            {
                path: 'realisateur/create',
                name: 'realisateur.create',
                component: realisateurCreate,
            },
            {
                path: 'realisateur/:id/edit',
                name: 'realisateur.edit',
                component: realisateurCreate,
            },
            // rayons
            {
                path: 'rayons',
                component: rayonIndex,
            },
            {
                path: 'rayons/create',
                name: 'rayons.create',
                component: rayonCreate,
            },
            {
                path: 'rayons/:id/edit',
                name: 'rayons.edit',
                component: rayonCreate,
            },
            // disques
            {
                path: 'disques',
                component: disqueIndex,
            },
            {
                path: 'disque/create',
                name: 'disque.create',
                component: disqueCreate,
            },
            {
                path: 'disque/:id/edit',
                name: 'disque.edit',
                component: disqueCreate,
            },
            // categorie
            {
                path: 'categorie',
                component: CategorieIndex,
            },
            {
                path: 'categorie/create',
                name: 'categorie.create',
                component: CategorieCreate,
            },
            {
                path: 'categorie/:id/edit',
                name: 'categorie.edit',
                component: CategorieCreate,
            }
        ],
    },

    //  DEFAULT ROUTE
    {path: '*', component: NotFoundPage},
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.requiresAuth)) {
        if (!store.getters['Auth/isAuthenticated']) {
            return next('/login')
        }
    }

    if (to.matched.some(m => m.meta.redirectIfAuthenticated) && store.getters['Auth/isAuthenticated']) {
        return next('/admin/dashboard')
    }

    return next()
})

export default router

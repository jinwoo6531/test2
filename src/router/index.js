// import firebase from 'firebase/app'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Splash from '@/views/Splash'
import AccessAgree from '@/views/Access-agree'
import Walkthrough from '@/views/Walkthrough'
import Welcome from '@/views/Welcome'
import AuthLayout from '@/views/Auth-layout'
import MapLayout from '@/views/Map-layout'
import StaticLayout from '@/views/Static-layout'
import CallingLayout from '@/views/Calling-layout'
import CallFail from '@/views/Call-fail'
import GoodBye from '@/views/Good-bye'
import Import from '@/views/im-port'

Vue.use(VueRouter)

const routes = [
  {
    path: '/import',
    name: 'Import',
    component: Import
  },
  {
    path: '/splash',
    name: 'Splash',
    component: Splash
  },
  {
    path: '/accessagree',
    name: 'AccessAgree',
    component: AccessAgree
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/walkthrough',
    name: 'Walkthrough',
    component: Walkthrough
  },
  {
    path: '/calling',
    name: 'CallingLayout',
    component: CallingLayout
  },
  {
    path: '/fail',
    name: 'CallFail',
    component: CallFail
  },
  {
    path: '/goodbye',
    name: 'GoodBye',
    component: GoodBye
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [{
      path: 'accessphone',
      name: 'AccessPhone',
      component: () => import('@/components/Auth/AccessPhone.vue')
    },
    {
      path: 'accesscode',
      name: 'AccessCode',
      component: () => import('@/components/Auth/AccessCode.vue')
    },
    {
      path: 'agreecheck',
      name: 'AgreeCheck',
      component: () => import('@/components/Auth/AgreeCheck.vue')
    },
    {
      path: 'register',
      name: 'Register',
      component: () => import('@/components/Auth/Register.vue')
    }]
  },
  {
    path: '/map',
    component: MapLayout,
    beforeEnter: (to, from, next) => {
      next()
    },
    children: [{
      path: 'gunsan',
      name: 'Gunsan',
      component: () => import('@/components/Map/Gunsan.vue')
    },
    {
      path: 'daegu',
      name: 'Daegu',
      component: () => import('@/components/Map/Daegu.vue')
    },
    {
      path: 'sejong',
      name: 'Sejong',
      component: () => import('@/components/Map/Sejong.vue')
    },
    {
      path: 'sangam',
      name: 'Sangam',
      component: () => import('@/components/Map/Sangam.vue')
    },
    {
      path: 'callingshuttle',
      name: 'CallingShuttle',
      component: () => import('@/components/Map/Callingshuttle.vue')
    }]
  },
  {
    path: '/',
    component: StaticLayout,
    beforeEnter: (to, from, next) => {
      next()
    },
    children: [{
      path: '',
      name: 'Main',
      component: () => import('@/components/Static/Main')
    },{
      path: 'introduction',
      name: 'Introduction',
      component: () => import('@/components/Static/Introduction')
    },
    {
      path: 'schedule',
      name: 'Schedule',
      component: () => import('@/components/Static/Schedule')
    },
    {
      path: 'faq',
      name: 'FAQ',
      component: () => import('@/components/Static/FAQ')
    },
    {
      path: 'serviceinfo',
      name: 'Serviceinfo',
      component: () => import('@/components/Static/Serviceinfo')
    },
    {
      path: 'userinfo',
      name: 'Userinfo',
      component: () => import('@/components/Static/Userinfo')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (Vue.prototype.$isFirebaseAuth) next()
})

export default router
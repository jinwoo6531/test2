import * as firebase from 'firebase/app'
import Vue from 'vue'
import VueRouter from 'vue-router'
import AccessAgree from '@/views/Access-agree'
import Walkthrough from '@/views/Walkthrough'
import Welcome from '@/views/Welcome'
import AuthLayout from '@/views/Auth-layout'
import MapLayout from '@/views/Map-layout'
import StaticLayout from '@/views/Static-layout'
import CallingLayout from '@/views/Calling-layout'
import CallFail from '@/views/Call-fail'
import Thanks from '@/views/Thanks'
import AutoCancel from '@/views/Auto-cancel'
import GoodBye from '@/views/Good-bye'
import NotFoundComponent from '@/views/NotFoundComponent'
// import Webview from '@/views/Webview'

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user.uid == null) {
      return next('/walkthrough')
    } else {
      return next()
    }
  })
}

const routes = [
// {
//   path: '/webview',
//   name: 'Webview',
//   component: Webview
// },
{
  path: '/accessagree',
  name: 'AccessAgree',
  component: AccessAgree
},
{
  path: '/welcome',
  name: 'Welcome',
  component: Welcome,
  beforeEnter: requireAuth(),
},
{
  path: '/walkthrough',
  name: 'Walkthrough',
  component: Walkthrough
},
{
  path: '/calling',
  name: 'CallingLayout',
  component: CallingLayout,
  beforeEnter: requireAuth(),
},
{
  path: '/fail',
  name: 'CallFail',
  component: CallFail,
  beforeEnter: requireAuth(),
},
{
  path: '/goodbye',
  name: 'GoodBye',
  component: GoodBye
},
{
  path: '/thanks',
  name: 'Thanks',
  component: Thanks,
  beforeEnter: requireAuth(),
},
{
  path: '/autocancel',
  name: 'AutoCancel',
  component: AutoCancel,
  beforeEnter: requireAuth(),
},
{
  path: '*',
  name: 'NotFoundComponent',
  component: NotFoundComponent
},
{
  path: '/auth',
  component: AuthLayout,
  children: [{
    path: 'accessphone',
    name: 'AccessPhone',
    component: () => import(/* webpackChunkName: "AccessPhone" */ '@/components/Auth/AccessPhone.vue')
  },
  {
    path: 'accesscode',
    name: 'AccessCode',
    component: () => import(/* webpackChunkName: "AccessCode" */ '@/components/Auth/AccessCode.vue')
  },
  {
    path: 'agreecheck',
    name: 'AgreeCheck',
    component: () => import(/* webpackChunkName: "AgreeCheck" */ '@/components/Auth/AgreeCheck.vue'),
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '@/components/Auth/Register.vue'),
  }
  ]
},
{
  path: '/map',
  component: MapLayout,
  beforeEnter: requireAuth(),
  children: [{
      path: 'site',
      name: 'Site',
      component: () => import(/* webpackChunkName: "Site" */ '@/components/Map/Site.vue')
    },
    {
      path: 'callingshuttle',
      name: 'CallingShuttle',
      component: () => import(/* webpackChunkName: "CallingShuttle" */ '@/components/Map/Callingshuttle.vue')
    }
  ]
},
{
  path: '/',
  component: StaticLayout,
  beforeEnter: requireAuth(),
  children: [{
    path: '',
    name: 'Main',
    component: () => import(/* webpackChunkName: "Main" */ '@/components/Static/Main')
  }, {
    path: 'introduction',
    name: 'Introduction',
    component: () => import(/* webpackChunkName: "Introduction" */ '@/components/Static/Introduction')
  },
  {
    path: 'schedule',
    name: 'Schedule',
    component: () => import(/* webpackChunkName: "Schedule" */ '@/components/Static/Schedule')
  },
  {
    path: 'faq',
    name: 'FAQ',
    component: () => import(/* webpackChunkName: "FAQ" */ '@/components/Static/FAQ')
  },
  {
    path: 'serviceinfo',
    name: 'Serviceinfo',
    component: () => import(/* webpackChunkName: "Serviceinfo" */ '@/components/Static/Serviceinfo')
  },
  {
    path: 'userinfo',
    name: 'Userinfo',
    component: () => import(/* webpackChunkName: "Userinfo" */ '@/components/Static/Userinfo')
  }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  duplicateNavigationPolicy: 'ignore',
  base: process.env.BASE_URL,
  routes
})

export default router
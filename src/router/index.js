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
import Import from '@/views/im-port'
import Webview from '@/views/Webview'
// import store from '../store/modules/auth'

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
  if (user.uid == null) {
    return next('/auth/accessphone')
  } else {
    return next()
  }
})
  /* const currentUser = firebase.auth().currentUser;
  console.log('current user', currentUser)
  if (currentUser == null) {
    // 인증되어 있지 않으면 로그인 페이지로 리다이렉트
    console.log('next access phone')
    return next('/auth/accessphone')
  } else {
    console.log('next')
    // store.state.isLoading = true;
    // setTimeout(() => {
    //   store.state.isLoading = false;
    // }, 2000);
    return next()
  } */
}

const routes = [{
    path: '/webview',
    name: 'Webview',
    component: Webview
  },
  {
    path: '/import',
    name: 'Import',
    component: Import
  },
  {
    path: '/accessagree',
    name: 'AccessAgree',
    component: AccessAgree
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/walkthrough',
    name: 'Walkthrough',
    redirect: '/main',
    component: Walkthrough
  },
  {
    path: '/calling',
    name: 'CallingLayout',
    component: CallingLayout,
  },
  {
    path: '/fail',
    name: 'CallFail',
    component: CallFail,
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
  },
  {
    path: '/autocancel',
    name: 'AutoCancel',
    component: AutoCancel,
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
        component: () => import('@/components/Auth/AgreeCheck.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/components/Auth/Register.vue'),
      }
    ]
  },
  {
    path: '/map',
    component: MapLayout,
    beforeEnter: requireAuth(),
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
        component: () => import('@/components/Static/Main')
      }, {
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
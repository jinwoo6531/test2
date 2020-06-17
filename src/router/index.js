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
import store from '../store/modules/auth'

Vue.use(VueRouter)

/* const requireAuth = () => (to, from, next) => {
  if (store.state.uid !== " ") {
    return next()
  } 
  next('/walkthrough')
} */

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
    component: Welcome,
    // beforeEnter: requireAuth()
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
    meta: { requireAuth: true },
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
    meta: { requireAuth: true },
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

router.beforeEach((to, from, next) => {
  // 상위 라우트를 포함해 인증이 필요한 라우트인지를 확인
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 인증상태 확인하기
    if (store.state.uid == " ") {
      // 인증되어 있지 않으면 로그인 페이지로 리다이렉트
      next({
        path: '/walkthrough',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // 인증이 필요하지 않은 라우트라면 next()로 이동
  }
})

export default router
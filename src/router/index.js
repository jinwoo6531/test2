// import firebase from 'firebase/app'
import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/views/Splash'
import InfoStep from '@/views/InfoStep'
import AuthLayout from '@/views/Auth-layout'
import MapLayout from '@/views/Map-layout'
import StaticLayout from '@/views/Static-layout'

Vue.use(Router)

// Auth
const AccessPhone = () => import( /* webpackChunkName: "AccessPhone" */ '@/components/Auth/AccessPhone.vue')
const AccessCode = () => import( /* webpackChunkName: "AccessCode" */ '@/components/Auth/AccessCode.vue')
const AgreeCheck = () => import( /* webpackChunkName: "AgreeCheck" */ '@/components/Auth/AgreeCheck.vue')
const Register = () => import( /* webpackChunkName: "Register" */ '@/components/Auth/Register.vue')

// Map
const Gunsan = () => import( /* webpackChunkName: "Gunsan" */ '@/components/Map/Gunsan.vue')
const Daegu = () => import( /* webpackChunkName: "Daegu" */ '@/components/Map/Daegu.vue')
const Sejong = () => import( /* webpackChunkName: "Sejong" */ '@/components/Map/Sejong.vue')
const Sangam = () => import( /* webpackChunkName: "Sangam" */ '@/components/Map/Sangam.vue')

// Static
const Schedule = () => import( /* webpackChunkName: "Schedule" */ '@/components/Static/Schedule')
const Introduction = () => import( /* webpackChunkName: "Introduction" */ '@/components/Static/Introduction')
const FAQ = () => import( /* webpackChunkName: "FAQ" */ '@/components/Static/FAQ')

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/splash',
    name: 'Splash',
    component: Splash
  },
  {
    path: '/infostep',
    name: 'InfoStep',
    component: InfoStep
  },
  {
    path: '/auth',
    component: AuthLayout,
    // 페이지를 볼 때 인증이 필요한지 등의 라우트 고유 정보를 설정
    // meta: {
    //   requireAuth: true
    // },
    children: [{
      path: 'accessphone',
      name: 'AccessPhone',
      component: AccessPhone
    },
    {
      path: 'accesscode',
      name: 'AccessCode',
      component: AccessCode
    },
    {
      path: 'agreecheck',
      name: 'AgreeCheck',
      component: AgreeCheck
    },
    {
      path: 'register',
      name: 'Register',
      component: Register
    }]
  },
  {
    path: '/map',
    component: MapLayout,
    children: [{
      path: 'gunsan',
      name: 'Gunsan',
      component: Gunsan
    },
    {
      path: 'daegu',
      name: 'Daegu',
      component: Daegu
    },
    {
      path: 'sejong',
      name: 'Sejong',
      component: Sejong
    },
    {
      path: 'sangam',
      name: 'Sangam',
      component: Sangam
    }]
  },
  {
    path: '/',
    component: StaticLayout,
    children: [{
      path: '',
      name: 'Introduction',
      component: Introduction
    },
    {
      path: 'schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: 'faq',
      name: 'FAQ',
      component: FAQ
    }]
  }]
})

// const waitFirebase = () => {
//   return new Promise((resolve, reject) => {
//     let cnt = 0
//     const timer = setInterval(() => {
//       if (store.state.firebaseLoaded) {
//         clearInterval(timer)
//         resolve()
//       } else if (cnt++ > 200) {
//         clearInterval(timer)
//         reject(Error('Firebase Load Error'))
//       }
//     }, 10)
//   })
// }

// router.beforeEach((to, from, next) => {
//   setTimeout(() => {
//     Vue.prototype.$Progress.start()
//   })
//   if (Vue.prototype.$isFirebaseAuth) next()
//   // waitFirebase()
//   // .then(() => next())
//   // .catch(e => console.log(e))
// })

// // eslint-disable-next-line no-unused-vars
// router.afterEach((to, from) => {
//   Vue.prototype.$Progress.finish()
// })

export default router
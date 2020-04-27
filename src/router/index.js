// import firebase from 'firebase/app'
import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/views/Splash'
import InfoStep from '@/views/InfoStep'
import Home from '@/views/Home'
import AccessPhone from '@/views/AccessPhone'
import AccessCode from '@/views/AccessCode'
import AgreeCheck from '@/views/AgreeCheck'
import Register from '@/views/Register'

Vue.use(Router)

// 웹 페이지가 로딩될 때 한번에 로딩되지 않고 단독으로 요청시, 이 컴포넌트만 로딩되기 때문에
// 속도 면에서 굉장한 차이가 있다.
const Gunsan = () => import( /* webpackChunkName: "Gunsan" */ '@/components/Gunsan.vue')
const Daegu = () => import( /* webpackChunkName: "Daegu" */ '@/components/Daegu.vue')
const Sejong = () => import( /* webpackChunkName: "Sejong" */ '@/components/Sejong.vue')
const Sangam = () => import( /* webpackChunkName: "Sangam" */ '@/components/Sangam.vue')
const Schedule = () => import( /* webpackChunkName: "Schedule" */ '@/components/Schedule')
const Introduction = () => import( /* webpackChunkName: "Introduction" */ '@/components/Introduction')
const FAQ = () => import( /* webpackChunkName: "FAQ" */ '@/components/FAQ')

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/splash',
    name: 'Splash',
    component: Splash
  }, {
    path: '/',
    component: Home,
    // 페이지를 볼 때 인증이 필요한지 등의 라우트 고유 정보를 설정
    meta: {
      requireAuth: true
    },
    children: [{
      path: '',
      name: 'Introduction',
      component: Introduction
    },
    {
      path: '/gunsan',
      name: 'Gunsan',
      component: Gunsan
    },
    {
      path: '/daegu',
      name: 'Daegu',
      component: Daegu
    },
    {
      path: '/sejong',
      name: 'Sejong',
      component: Sejong
    },
    {
      path: '/sangam',
      name: 'Sangam',
      component: Sangam
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    }
    ]
  },
  {
    path: '/infostep',
    name: 'InfoStep',
    component: InfoStep
  },
  {
    path: '/accessphone',
    name: 'AccessPhone',
    component: AccessPhone
  },
  {
    path: '/accesscode',
    name: 'AccessCode',
    component: AccessCode
  },
  {
    path: '/agreecheck',
    name: 'AgreeCheck',
    component: AgreeCheck
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  ]
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

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    Vue.prototype.$Progress.start()
  })
  if (Vue.prototype.$isFirebaseAuth) next()
  // waitFirebase()
  // .then(() => next())
  // .catch(e => console.log(e))
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  Vue.prototype.$Progress.finish()
})

export default router
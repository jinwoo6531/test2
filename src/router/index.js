// import firebase from 'firebase/app'
import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/views/Splash'
import Home from '@/views/Home'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import AgreeCheck from '@/views/AgreeCheck'
import InfoStep from '@/views/InfoStep'
import AccessPhone from '@/views/AccessPhone'
import SignIn from '@/views/SignIn'
import Register from '@/views/Register'
import Dashboard from '@/views/Dashboard'
import AccessCode from '@/views/AccessCode'

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
      name: 'Home',
      component: Home,
      // 페이지를 볼 때 인증이 필요한지 등의 라우트 고유 정보를 설정
      meta: {
        requireAuth: true
      },
      children: [{
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
          path: '/introduction',
          name: 'Introduction',
          component: Introduction
        },
        {
          path: '/faq',
          name: 'FAQ',
          component: FAQ
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/agreecheck',
      name: 'AgreeCheck',
      component: AgreeCheck
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
      path: '/signin',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/accesscode',
      name: 'AccessCode',
      component: AccessCode
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

/* router.beforeEach((to, from, next) => {
  // Firebase에서 현재 사용자를 가져오는 기능
  // 현재 로그인 한 사용자를 다시 보낸다.
  // 사용자가 로그인하지 않은 경우 null
  const currentUser = firebase.auth().currentUser
  // 상위 라우트를 포함해 인증이 필요한 라우트인지 확인
  const requireAuth = to.matched.some(record => record.meta.requireAuth)

  // 인증이 되어있지 않으면 login 페이지로 라우트
  if (currentUser && !requireAuth) next('login')
  // 인증이 되어 있으면 home 페이지로 라우트
  else if (!requireAuth && currentUser) next('home')
  // 인증이 필요하지 않은 라우트면 next()로 이동
  else next()
}) */

export default router
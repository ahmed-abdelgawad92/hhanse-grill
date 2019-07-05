import Vue from 'vue';
import VueRouter from 'vue-router';
import UserLogin from './components/admin/UserLogin.vue';
import AdminPanel from './components/admin/admin-panel/AdminPanel.vue';
import TodayMenu from './components/today-menu/TodayMenu.vue';
import Home from './components/admin/admin-panel/home/Home.vue';
import CalendarAdministration from './components/admin/admin-panel/calendar/CalendarAdministration.vue';
import WeekPlan from './components/admin/admin-panel/calendar/WeekPlan.vue';
import ChangePassword from './components/admin/ChangePassword.vue';
import UserRegisteration from './components/admin/UserRegisteration.vue';
import Users from './components/admin/Users.vue';
import LandingPage from './components/LandingPage.vue';
import AddKarte from './components/admin/karte/AddKarte.vue';
import Karte from './components/admin/karte/Karte.vue';
import FirstPage from './components/karte/FirstPage.vue';
import SecondPage from './components/karte/SecondPage.vue';
import ThirdPage from './components/karte/ThirdPage.vue';
import SlideShow from './components/slideshow/SlideShow.vue';
import ClientPhotosAll from './components/admin/client-page/ClientPhotosAll.vue';
import JWT from './jwt';

Vue.use(VueRouter);

const checkAuthAdmin = (to, from, next) => {
  if (!JWT.isAuthenticated()) {
    next({
      path: '/login',
      query: { nextUrl: to.fullPath }
    });
  } else if (!JWT.isAdmin()) {
    next({
      path: '/admin-panel'
    });
  } else {
    next();
  }
}; 
const routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: '/mittagstisch',
    component: TodayMenu
  },
  {
    path: '/slideshow',
    component: SlideShow
  },
  {
    path: '/firstpage',
    component: FirstPage
  },
  {
    path: '/secondpage',
    component: SecondPage
  },
  {
    path: '/thirdpage',
    component: ThirdPage
  },
  {
    path: '/login',
    component: UserLogin,
    beforeEnter: (to, from, next) => {
      if (!JWT.isAuthenticated()) {
        next();
      } else {
        next({
          path: '/admin-panel'
        });
      }
    }
  },
  {
    path: '/admin-panel',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      if(JWT.isAuthenticated()){
        next();
      }else{
        next({
          path: '/login',
          query: { nextUrl: to.fullPath }
        });
      }
    },
    children: [
      { 
        path: '', 
        component: Home 
      },
      { 
        path: '/year-calendar', 
        component: CalendarAdministration,
        beforeEnter: checkAuthAdmin
      },
      { 
        path: '/week-menu', 
        component: WeekPlan,
        beforeEnter: checkAuthAdmin
      },
      {
        path: '/change-password',
        component: ChangePassword,
        beforeEnter: checkAuthAdmin
      },
      {
        path: '/user-registeration',
        component: UserRegisteration,
        beforeEnter: checkAuthAdmin 
      },
      {
        path: '/all/users',
        component: Users,
        beforeEnter: checkAuthAdmin
      },
      {
        path: '/karte',
        component: Karte,
        beforeEnter: checkAuthAdmin
      },
      {
        path: '/karte/add',
        component: AddKarte,
        beforeEnter: checkAuthAdmin
      },
      {
        path: '/client/photos',
        component: ClientPhotosAll,
        beforeEnter: checkAuthAdmin
      },
    ]
  }
]

export default new VueRouter({routes, mode: 'history'})
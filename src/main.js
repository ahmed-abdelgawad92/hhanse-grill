import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import JWT from './jwt';

axios.defaults.baseURL = 'http://localhost:8000/api/';

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = JWT.getTokenAuthorization();
  return config;
});

axios.interceptors.response.use(res => res, error => {
  if(error.response.status == 401){
    router.push({
      path: '/login',
      query: { nextUrl: router.currentRoute.path }
    });
  }
  throw error;
});

Vue.filter('capitalize', value => {
  return value.split(' ').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');
});

Vue.use(Vuelidate);

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

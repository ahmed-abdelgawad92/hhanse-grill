import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import JWT from './jwt';

axios.defaults.baseURL = 'https://api.hhansegrill-halal.de/api/';
// axios.defaults.baseURL = 'http://hanse.ahmedelkayaty92.de/api/';
// axios.defaults.baseURL = 'http://localhost:8000/api/';

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = JWT.getTokenAuthorization();
  return config;
});

axios.interceptors.response.use(res => res, error => {
  if(error.response.status == 401){
    JWT.deleteToken();
    router.push({
      path: '/login',
      query: { nextUrl: router.currentRoute.path == '/login' ? '/admin-panel' : router.currentRoute.path }
    });
  }
  throw error;
});

Vue.filter('capitalize', value => {
  return value ? value.split(' ').map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ') : '';
});
Vue.filter('currency', value => {
  return value ? (1 * value).toLocaleString('de-DE',{style: 'currency', currency: 'Eur'}) : '0,00 €';
});
Vue.filter('articleNum', value => {
  let num = value + '';
  while (num.length < 3) {
    num = '0' + num;
  }
  return num;
});

Vue.prototype.$domain = 'https://api.hhansegrill-halal.de/';
// Vue.prototype.$domain = 'http://hanse.ahmedelkayaty92.de/';
// Vue.prototype.$domain = 'http://localhost:8000/';

Vue.use(Vuelidate);

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

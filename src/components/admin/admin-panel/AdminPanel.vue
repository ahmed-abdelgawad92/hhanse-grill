<template>
  <div class="wrapper">
    <app-admin-header @logout="logout" v-if="isAdmin"></app-admin-header>
    <app-user-header @logout="logout" v-if="!isAdmin"></app-user-header>
    <router-view class="site-content"></router-view>
    <app-footer class="site-footer"></app-footer>
  </div>
</template>

<script>
  import Footer from './shared/Footer.vue';
  import AdminHeader from './shared/AdminHeader.vue';
  import UserHeader from './shared/UserHeader.vue';
  import JWT from '../../../jwt.js';
  import axios from 'axios';

  export default {
    data: () => {
      return {
        isAdmin: JWT.isAdmin()
      }
    },
    components: {
      appFooter: Footer,
      appAdminHeader: AdminHeader,
      appUserHeader: UserHeader
    },
    methods: {
      logout: function(){
        axios.post('logout').then(
          response => {
            console.log(response);
            JWT.deleteToken();
            this.$router.push('/login');
          },
          error => {console.log(error)}
        );
        
      }
    }
  }
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
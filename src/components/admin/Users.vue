<template>
  <div class="container pt-3">
    <div v-if="success" style="position: fixed; top: 20px; right: 20px; z-index:100;">
      <div class="toast fade show" data-delay="3000" style="width:350px" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-success ">
          <strong class="mr-auto">Erfolgreiche Meldung</strong>
          <small class="text-muted">just now</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          {{success}}
        </div>
      </div>
    </div>
    <h3 class="text-center text-muted">Alle Benutzer</h3>
    <div class="alert alert-warning" v-if="users.length < 1">Es gibt keine Benutzer</div>
    <user v-for="user in users" :key="user.id" :user="user" @successDelete="successDelete($event)"></user>
  </div>
</template>

<script>
  import axios from 'axios';
  import User from './User.vue';
  export default {
    data: () => {
      return {
        users: [],
        success: ''
      }
    },
    components: {
      user: User
    },
    methods: {
      fetchUsers: function(){
        axios.get('all/users').then(response => {
          this.users = response.data.users;
          console.log(this.users);
        }).catch(error => {
          console.log(error.response);
        });
      },
      successDelete: function(success){
        this.fetchUsers();
        this.success = success;
        setTimeout(()=>{
          this.success = '';
        }, 3000);
      }
    },
    created: function(){
      this.fetchUsers();
    }
  }
</script>

<style scoped>

</style>
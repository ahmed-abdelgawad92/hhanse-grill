<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">HHanse Grill</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <router-link tag="li" to="/admin-panel" class="nav-item" active-class="active" exact>
          <a class="nav-link">Home</a>
        </router-link>
        <router-link tag="li" to="/change-password" class="nav-item" active-class="active" exact>
          <a class="nav-link">Passwort verändern</a>
        </router-link>
        <li class="nav-item" @click="$emit('logout')">
          <a class="nav-link">Ausloggen</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
a{
 cursor: pointer;
}
.navbar-brand::first-letter{
  color: rgb(243, 20, 20);
}
li.active{
  background-color: rgb(235, 235, 235) !important;
  border-radius: 5px;
}
.nav-item:hover{
  background-color: rgb(241, 241, 241);
  border-radius: 5px;
}
</style>
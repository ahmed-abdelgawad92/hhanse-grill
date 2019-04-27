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
        <router-link tag="li" to="/year-calendar" class="nav-item" active-class="active">
          <a class="nav-link">Kalendar</a>
        </router-link>
        <router-link tag="li" to="/week-menu" class="nav-item" active-class="active" exact>
          <a class="nav-link">Wöchentlich-Speiseplan</a>
        </router-link>
        <li ref="li_karte" class="nav-item" :class="{ 'active': isActiveKarte }">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Karte
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown2" ref="karte_list">
            <router-link @click.native="removeShow" to="/karte/add" class="dropdown-item">Neues Gericht hinzufügen</router-link>
            <router-link @click.native="removeShow" to="/karte" class="dropdown-item">Die Karte anschauen</router-link>
          </div>
        </li>
        <li ref="li_client" class="nav-item" :class="{ 'active': isActiveClient }">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Kundenseite
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown2" ref="client_list">
            <router-link @click.native="removeShow" to="/client/photo/add" class="dropdown-item">Neues Foto hinzufügen</router-link>
            <router-link @click.native="removeShow" to="/client/photos" class="dropdown-item">Die Fotos anschauen</router-link>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img style="width:30px; height:30px;" src="../../../../assets/profile.png" alt="">
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/user-registeration" class="dropdown-item">Neuer Benutzer erstellen</router-link>
            <router-link to="/all/users" class="dropdown-item">Alle Benutzer zeigen</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/change-password" class="dropdown-item">Passwort verändern</router-link>
            <button class="dropdown-item" @click="$emit('logout')">Ausloggen</button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      isActiveKarte() {
        return this.$route.path === '/karte' || this.$route.path === '/karte/add';
      },
      isActiveClient() {
        return this.$route.path === '/client/photo/add' || this.$route.path === '/client/photos';
      },
    },
    methods: {
      removeShow(){
        $(this.$refs.karte_list).removeClass('show');
        $(this.$refs.li).removeClass('show');      
        $(this.$refs.client_list).removeClass('show');
        $(this.$refs.li_client).removeClass('show');      
      }
    }
  }
</script>

<style scoped>
a{
 cursor: pointer;
}
li.active{
  background-color: rgb(235, 235, 235) !important;
  border-radius: 5px;
}
.nav-item:hover{
  background-color: rgb(241, 241, 241);
  border-radius: 5px;
}
.navbar-brand::first-letter{
  color: rgb(243, 20, 20);
}
@media (min-width: 992px){
  .navbar-expand-lg .navbar-nav .dropdown-menu{
    position: absolute;
    right: 5px;
    left: 75%;
  }
}
</style>
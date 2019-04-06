<template>
  <div class="container">
    <h3 class="my-3 text-center text-muted">Der heutige Mittagstisch</h3>
    <template v-if="menu_items.length > 0">
      <div v-for="(item, index) in menu_items" :key="index">
        <menu-item @activate="activate($event)" @deactivate="deactivate($event)" :item="item"></menu-item>
      </div>
    </template>
    <template v-else>
      <div class="alert alert-warning">
        Sie haben kein Angebot für Heute hinzugefügt 
      </div>
    </template>
  </div>
</template>

<script>
  import axios from 'axios';
  import MenuItem from '../menu/menu-item/MenuItem.vue';
  export default {
    data: () => {
      return {
        menu_items: [],
        date: new Date().toISOString().slice(0, 10)
      }
    },
    components: {
      MenuItem
    },
    methods: {
      fetchTodayMeals: function(){
        axios.get('menu_items/' + this.date).then(
          response => { 
            this.menu_items = response.data;
          },
          error => {console.log(error);}
        );
      },
      activate: function($event){
        axios.put('activate_menu_item/'+ $event).then(
          response => {
            this.fetchTodayMeals();
          },
          error => {console.log(error)}
        );
      },
      deactivate: function($event){
        axios.put('deactivate_menu_item/'+ $event).then(
          response => {
            this.fetchTodayMeals();
          },
          error => {console.log(error)}
        );
      }
    },
    created: function(){
      this.fetchTodayMeals();
    }
  }
</script>

<style scoped>

</style>
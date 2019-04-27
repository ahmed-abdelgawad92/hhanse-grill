<template>
  <div class="container mt-3">
    <div class="min-w-70 mx-auto">
      <calendar :date="date" @dateChange="retrieveMenuItems"></calendar>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <app-menu @getAllIngredientsAndMeals="fetchAllMealsAndIngredients(true)" :items="menuItems" :date="date"></app-menu>
      </div>
      <div class="col-md-6">
        <app-menu-insert @getAllIngredientsAndMeals="fetchAllMealsAndIngredients(true)" :date="date" :meals="meals" :ingredients="ingredients"></app-menu-insert>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Calendar from './Calendar.vue';
  import Menu from '../menu/Menu.vue';
  import MenuItemInsert from '../menu/menu-item/MenuItemInsert.vue';
  export default {
    data: () => {
      return {
        meals: [],
        ingredients: [],
        menuItems: [],
        date: ''
      };
    },
    computed: {
      d: function(){
        const d = new Date().toLocaleString('de-DE').split(',')[0].split('.');
        return d[2]+'-'+d[1]+'-'+d[0];
      }
    },
    components: { 
      Calendar,
      appMenu: Menu,
      appMenuInsert: MenuItemInsert 
    },
    methods: {
      retrieveMenuItems: function(date = this.date){
        this.date = date;
        this.fetchTodayMeals();
      },
      fetchTodayMeals: function(){
        axios.get('menu_items/' + this.date).then(
          response => { 
            this.menuItems = response.data;
          },
          error => {console.log(error);}
        );
      },
      fetchAllMealsAndIngredients: function(callBack = false){
        axios.get('all-meals-ingredients').then(
          response => {
            this.meals = response.data.meals;
            this.ingredients = response.data.ingredients;
          },
          error => {console.log(error);}
        );
        if(callBack){
          this.retrieveMenuItems();
        }
      }
    },
    created: function(){
      if(this.$route.query.date != null){
        this.date = this.$route.query.date;        
      }else{
        this.date = this.d;        
      }
      this.fetchTodayMeals();
      this.fetchAllMealsAndIngredients();
    }
  }
</script>

<style scoped>
@media screen and (min-width: 600px){
  .min-w-70{
    width: 70% !important;
  } 
}
</style>
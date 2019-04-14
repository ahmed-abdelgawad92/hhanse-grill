<template>
  <div>
    <div id="menu-background" v-if="menuItems">
      <h1 class="h1">Mittagstisch</h1>
      <div id="menu">
        <div id="menu-item" v-for="(item, index) in menuItems" :key="item.name">
          <today-menu-item :item="item" :index="index"></today-menu-item>
        </div>
      </div>
    </div>
    <div v-else id="menu-background">
      
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import TodayMenuItem from './today-menu-item/TodayMenuItem';
export default {
  data: () => {
    return {
      menuItems: undefined
    };
  },
  components: {
    todayMenuItem: TodayMenuItem
  },
  methods: {
    fetchMeals: function(){
      axios.get('menu_items').then(
      response => { 
        this.menuItems = response.data;
      },
      error => {console.log(error);}
      );
    },
    anyAvailable: function(){
      return this.menuItems.some(el => el.available == 1);
    }
  },
  created: function() {
    this.fetchMeals();
  },
  mounted: function(){
    setInterval(()=>{
      this.fetchMeals();;
    },60000);
  }
}
</script>
<style scoped>
*{
  font-family: 'Berkshire Swash', cursive;
}
h1{
  color: white;
}
.h1{
  font-size: 4rem;
  padding: 15px 0;
  text-align: center;
}
#menu-background{
  padding-top: 50px;
  background-image: url('../../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  width: 100%;
}
#menu{
  width: 75%;
  margin: 0 auto;
}
#menu-item{
  padding: 10px;
}
#menu-item:nth-child(odd){
  background-color: rgb(231, 40, 40); 
  color: white !important;
}
#menu-item:nth-child(even){
  background-color: rgb(243, 204, 74);
}
@media screen and (max-width: 1200px){
  .h1{
    font-size: 2rem;
  }
}
</style>
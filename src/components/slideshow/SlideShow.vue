<template>
  <div class="background">
    <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <slide-show-item v-for="(item, index) in items" :item="item" :index="index" :key="index"></slide-show-item>
      </div>
    </div>
  </div>
</template>

<script>
  import SlideShowItem from './SlideShowItem.vue';
  import axios from 'axios';
  export default {
    data: () => {
      return {
        items: undefined
      }
    },
    components: {
      SlideShowItem
    },
    methods: {
      fetchMeals: function(){
        axios.get('karte/slideshow').then(response => {
          this.items = response.data.karte;
          console.log(response.data.karte);
          
        }).catch(err => {console.log(err)});
      }
    },
    created(){
      this.fetchMeals();
    }
  }
</script>

<style scoped>
div.background{
  padding: 100px;
  background-image: url('../../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  width: 100%;
}
</style>
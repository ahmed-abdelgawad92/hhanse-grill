<template>
  <div class="background" style="cursor: none !important; padding: 0 !important;" data-new-version="1.0">
    <div id="carouselExampleInterval" ref="modal" class="carousel slide" data-interval="25000" data-pause="false" data-ride="carousel">
      <div class="carousel-inner">
        <slide-show-item v-for="(item, index) in items" :items="item" :index="index" :key="index"></slide-show-item>
        <div class="carousel-item">
          <h1 class="text-center pt-5 mt-5" style="color: white; font-size:5rem;">www.hhansegrill-halal.de</h1>
        </div>
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
          this.items = this.chunk(response.data.karte, 6);
          console.log(response.data.karte);
          console.log(this.items);
        }).catch(err => {console.log(err)});
      },
      chunk: function(arr, len) {
        var chunks = [],
        i = 0,
        n = arr.length;
        while (i < n) {
          chunks.push(arr.slice(i, i += len));
        }
        return chunks;
      }
    },
    mounted(){
      $('.carousel').carousel()
    },
    created(){
      this.fetchMeals();
      // $('.carousel').carousel({
      //     pause: false
      // })
    }
  }
</script>

<style scoped>
div.background{
  padding: 70px 20px 20px;
  /* background-image: url('../../assets/background.jpg'); */
  background-color: #000;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  width: 100%;
}
</style>
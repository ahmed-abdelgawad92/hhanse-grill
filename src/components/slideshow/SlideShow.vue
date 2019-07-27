<template>
  <div class="background">
    <div id="carouselExampleInterval" ref="modal" class="carousel slide" data-interval="25000" data-ride="carousel">
      <div class="carousel-inner">
        <slide-show-item v-for="(item, index) in items" :items="item" :index="index" :key="index"></slide-show-item>
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
          this.items = this.chunk(response.data.karte, 12);
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
    created(){
      this.fetchMeals();
      setTimeout(()=>{
        let modal = this.$refs.modal;
        $(modal).carousel({
            pause: false
        })
      }, 3000);
    }
  }
</script>

<style scoped>
div.background{
  padding: 70px 20px 20px;
  background-image: url('../../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  width: 100%;
}
</style>
<template>
  <div class="carousel-item" :class="{'active': index == 0}">
      <div class="row">
      <template v-for="(item, i) in items">
          <div class="col-4" :key="i">
            <!-- <div class="img" :style="{'background-image':'url(http://localhost:8000/'+path(item.photo)+')'}"></div> -->
            <img class="img" :src="$domain+path(item.photo)">
            <div class="container">
              <h1>{{item.meal}} <span>{{item.price | currency}}</span></h1> 
              <h3>{{item.ingredient}}</h3>
            </div>
          </div>
    </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['items', 'index'],
    methods: {
      path: function(path){
        return 'storage/' + path.split('/')[1];        
      }
    },
  }
</script>

<style scoped>
h1, h3{
  text-align: center;
  color: white;
  text-shadow: 5px 5px 5px black;
}
h1:first-of-type{
  margin-top: 10px;
}
h1{
  font-size: 1.5rem;
}
h1 span{
  margin-left: 10px;
}
h3{
  font-size: 1rem;
}
.img{
  display: block;
  background-position: center;
  /* background-color: #cccaca; */
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: content-box !important;
  width: 80%;
  margin: 0 auto;
  border: 5px solid white;
  height: 30vh;
  box-shadow: 10px 10px 20px black, -1px -1px 20px black;
}
</style>
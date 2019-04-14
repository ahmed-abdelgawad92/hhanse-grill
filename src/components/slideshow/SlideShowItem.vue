<template>
  <div class="carousel-item" :class="{'active': index == 0}">
    <div class="row">
      <template>
        <div class="col-8 p-4">
          <div class="img" :style="{'background-image':'url(http://localhost:8000/'+path+')'}"></div>
          <!-- <img :src="'http://localhost:8000/'+path"> -->
        </div>
        <div class="col-4">
          <div class="container">
            <h1>Nr. {{item.number | articleNum}}</h1> 
            <h1>{{item.meal}}</h1>
            <h3>{{item.ingredient}}</h3>
            <h1>{{item.price | currency}}</h1>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index'],
    computed: {
      path: function(){
        let path = 'storage/' + this.item.photo.split('/')[1];
        return path;
      }
    },
  }
</script>

<style scoped>
h1, h3{
  color: white;
  text-shadow: 5px 5px 5px black;
}
h1:first-of-type{
  margin-top: 80px;
}
h1{
  font-size: 4rem;
}
h3{
  font-size: 3.5rem;
}
.img{
  display: block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: content-box !important;
  width: 80%;
  margin: 0 auto;
  border: 15px solid white;
  height: 65vh;
  box-shadow: 10px 10px 20px black, -1px -1px 20px black;
}
</style>
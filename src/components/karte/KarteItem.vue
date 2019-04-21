<template>
  <div class="row py-1" :class="{'white': index % 2 == 0}">
    <div class="col-10"><strong>{{item.meal | capitalize}}</strong> <span class="details">{{item.ingredient | capitalize}}</span></div>
    <div class="col-2">{{item.price | currency}}</div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index']
  }
</script>

<style scoped>
.row{
  background-color: rgb(255, 255, 255) !important;
}
.white{
  /* background-color: #e3e3e3 !important;  */
  /* background-color: #bfff2b !important;  */
  background-color: #a56836 !important; 
  /* background-color: #8f592d !important;  */
  color: white;
  text-shadow: 1px 1px black;
}
.details{
  font-size: 0.8rem;
}
</style>
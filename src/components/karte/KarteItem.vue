<template>
  <div class="row py-1" :class="{'white': index % 2 == 0}">
    <div class="col-4">{{item.meal | capitalize}}</div>
    <div class="col-6">{{item.ingredient | capitalize}}</div>
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
  background-color: white !important;
}
.white{
  background-color: yellow !important; 
}
</style>
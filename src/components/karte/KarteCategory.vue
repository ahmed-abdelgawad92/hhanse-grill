<template>
  <div class="category">
    <h3 class="text-center category-head" v-if="category[0]">{{category[0]}}</h3>
    <h3 v-else style="height: 53px"></h3>
    <karte-item class="item" v-for="(item, index) in category[1]" :key="index" :index="index" :item="item"></karte-item>
  </div>
</template>

<script>
  import KarteItem from './KarteItem.vue';
  export default {
    components: {
      KarteItem
    },
    props: ['category']
  }
</script>

<style scoped>
.item:nth-child(odd){
  /* background-color: #eee; */
}
.category-head{
  padding-bottom: 20px;
  background-image: url('../../assets/wood_head.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #eee;
}
.category{
  margin-bottom: 10px;
}
</style>
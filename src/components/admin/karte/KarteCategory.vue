<template>
  <div>
    <h3 class="bg-warning p-3 m-0">{{category[0]}}</h3>
    <karte-item class="item" v-for="(item, index) in category[1]" :key="index" :item="item"></karte-item>
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
  background-color: #eee;
}
</style>
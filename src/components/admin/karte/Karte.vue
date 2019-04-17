<template>
  <div class="container">
    <h2 class="text-center my-5">Die Speise Karte</h2>
    <template v-if="items">
      <karte-category v-for="(item, index) in items" :key="index" :category="item"></karte-category>
    </template>
    <div v-else class="alert alert-warning">
      <h4>Achtung</h4>
      <p>Die Karte ist leer!!</p>
      <router-link tag="button" to="/karte/add" class="btn btn-warning">Ein Gericht hinzufügen</router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import KarteCategory from './KarteCategory.vue'
  export default {
    data: () => {
      return {
        items: null
      }
    },
    components: {
      KarteCategory
    },
    methods: {
      fetchAllItems(){
        axios.get('karte').then(response => {
          if(Object.keys(response.data.karte).length > 0){
            this.items = response.data.karte;
          }
        }).catch(err=>{console.log(err);})
      }
    },
    created(){
      this.fetchAllItems();
    }
  }
</script>

<style scoped>

</style>
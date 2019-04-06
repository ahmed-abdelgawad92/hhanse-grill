<template>
  <div>
    <h3 class="text-center text-muted">Mittagstisch am {{dateDeutsch()}}</h3>
    <template v-if="items.length > 0">
      <div v-for="(item, index) in items" :key="index">
        <menu-item @getAllIngredientsAndMeals="fetchAllMealsAndIngredients" :item="item"></menu-item>
      </div>
    </template>
    <template v-else>
      <div class="alert alert-warning">
        Sie haben kein Angebot an diesem Datum hinzugefügt 
      </div>
    </template>
  </div>
</template>

<script>
  import MenuItem from './menu-item/MenuItem.vue'
  export default {
    props: ['items','date'],
    components: {
      MenuItem
    },
    methods: {
      dateDeutsch: function(){
        return new Date(this.date).toLocaleString('de-DE',{year: 'numeric', month:'numeric', day: 'numeric'});
      },
      fetchAllMealsAndIngredients: function(){
        this.$emit('getAllIngredientsAndMeals');
      }
    }
  }
</script>

<style scoped>

</style>
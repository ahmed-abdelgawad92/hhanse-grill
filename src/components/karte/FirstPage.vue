<template>
  <div id="background">
    <div class="px-5">
      <div class="row" v-if="categories">
        <div class="col-4">
          <div v-for="(category, index) in pane1" :key="index" class="px-2">
            <template v-if="categories[category] != undefined">
              <karte-category :category="categories[category]"></karte-category>
            </template>
          </div>
        </div>
        <div class="col-4">
          <div v-for="(category, index) in pane2" :key="index" class="px-2">
            <template v-if="categories[category] != undefined">
              <karte-category :category="categories[category]"></karte-category>
            </template>
          </div>
        </div>
        <div class="col-4">
          <div v-for="(category, index) in pane3" :key="index" class="px-2">
            <template v-if="categories[category] != undefined">
              <karte-category :category="categories[category]"></karte-category>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import KarteCategory from './KarteCategory.vue';
  export default {
    data: () => {
      return {
        categories: undefined,
        categoryIndex: [
          'Super-Spar-Menüs',
          'Croque',
          'Klassiker',
          'Grillgerichte',
          'Snacks',
          'Beilagen',
          'Salate',
          'Fisch'
        ],
        pane1: [
          'Klassiker',
          'Grillgerichte',
        ],
        pane2: [
          'Snacks',
          'Croque',
        ],
        pane3: [
          'Beilagen',
        ]
      }
    },
    components: {
      KarteCategory
    },
    methods: {
      fetchKarte: function(){
        axios.get('karte').then(response => {
          this.categories = response.data.karte;
          console.log(response.data.karte);
          console.log(this.categories);
          
        }).catch(err => {console.log(err)});
      }
    },
    created(){
      this.fetchKarte();
      console.log(this.categories);
    }
  }
</script>

<style scoped>
#background{
  padding-top: 50px;
  background-image: url('../../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  width: 100%;
}
</style>
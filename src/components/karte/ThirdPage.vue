<template>
  <div id="background">
    <div class="px-4">
      <div class="row" v-if="categories">
        <div class="col-12 col-md-6 col-lg-6 col-xl-4">
          <div v-for="(category, index) in pane1" :key="index" class="px-2">
            <template v-if="categories[category] != undefined">
              <karte-category :category="categories[category]"></karte-category>
            </template>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6 col-xl-4">
          <div v-for="(category, index) in pane2" :key="index" class="px-2">
            <template v-if="categories[category] != undefined">
              <karte-category :category="categories[category]"></karte-category>
            </template>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6 col-xl-4">
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
        categories: {},
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
          'Snacks',
        ],
        pane2: [
          'Salate',
        ],
        pane3: [
          'Getränke',
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
      this.fetchKarte();
      console.log(this.categories);
    }
  }
</script>

<style scoped>
#background{
  padding-top: 25px;
  background-image: url('../../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  width: 100%;
}
</style>
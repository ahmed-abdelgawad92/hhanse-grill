<template>
  <div id="background" style="position: relative; cursor: none !important;" class="pb-3">
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
    <logo></logo>
  </div>
</template>

<script>
  import axios from 'axios';
  import KarteCategory from './KarteCategory.vue';
  import KarteItem from './KarteItem.vue';
  import Logo from './logo.vue';
  export default {
    data: () => {
      return {
        categories: {},
        klassiker: [],
        categoryIndex: [
          'Super-Spar-Menüs',
          'Grillgerichte',
          'Beilagen'
        ],
        pane1: [
          'Super-Spar-Menüs',
          'Fisch'
        ],
        pane2: [
          'Pasta',
          'Menü mit Pommes + Getränk (0,3 l)',
        ],
        pane3: [
          'Beilagen',
        ]
      }
    },
    components: {
      KarteCategory,
      KarteItem,
      Logo
    },
    methods: {
      fetchKarte: function(){
        axios.get('karte').then(response => {
          this.categories = response.data.karte;
          
        }).catch(err => {console.log(err)});
      },
      chunk: function(arr, len) {
        var chunks = {},
        i = 0,
        c = 0,
        n = arr.length;
        while (i < n) {
          let chunk = [];
          if(i == 0){
            chunk.push('Super-Spar-Menüs');
          }else{
            chunk.push('');
          }
          chunk.push(arr.slice(i, i += len));
          chunks[c++]=chunk;
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
  background: black;
  min-height: 100vh;
  width: 100%;
}
</style>
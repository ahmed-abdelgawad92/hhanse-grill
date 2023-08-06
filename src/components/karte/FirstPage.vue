<template>
  <div id="background" style="cursor: none !important;">
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
          <div class="px-2">
            <ul class="row py-1" style="background: white; font-weight: 800;">
              <li>Alle Croques enthalten Gluten, Milch</li>
              <li>Zu jedem Croque gibt es Salat und Käse</li>
            </ul>
          </div>
        </div>
      </div>
      <logo></logo>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Logo from './logo.vue';
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
          'Klassiker',
        ],
        pane2: [
          'Croque',
        ],
        pane3: [
          'Grillgerichte',
          'Grillplatten',
        ]
      }
    },
    components: {
      KarteCategory,
      Logo
    },
    methods: {
      fetchKarte: function(){
        axios.get('karte').then(response => {
          this.categories = response.data.karte;
          console.log(this.categories);
          
          // this.categories['Croque1'][0] = 'Croque'; 
          // this.categories['Croque2'][0] = 'Croque'; 
          // this.categories.Croque1 = [];
          // this.categories.Croque2 = [];
          // this.categories.Croque1.push('Croque');
          // this.categories.Croque2.push('');
          // this.categories.Croque1.push(this.chunk(this.categories['Croque'][1],19)[0]);
          // this.categories.Croque2.push(this.chunk(this.categories['Croque'][1],19)[1]);
          console.log(this.categories['Croque']);
          
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
  background: black;
  min-height: 100vh;
  width: 100%;
}
</style>
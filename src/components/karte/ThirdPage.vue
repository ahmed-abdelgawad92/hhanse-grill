<template>
  <div id="background" style="position: relative;">
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
            <div class="row p-2" style="background-color: rgb(231, 40, 40); color: white;">
              <ul class="col-6">
                <li style="list-style: none"><strong>Zusatzstoffe:</strong></li>
                <li>01. Sorbinsäure</li>
                <li>02. Benzolsäure</li>
                <li>12. Antioxidationsmittel</li>
              </ul>
              <ul class="col-6">
                <li>15. Koffeinhaltig</li>
                <li>11. Konservierungsstoffe</li>
                <li>14. Farbstoff</li>
                <li>17. mit Geschmacksverstärker</li>
              </ul>
            </div>
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
  import Logo from './logo.vue';
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
      KarteCategory,
      Logo
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
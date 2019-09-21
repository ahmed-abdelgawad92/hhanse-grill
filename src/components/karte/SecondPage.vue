<template>
  <div id="background" style="position: relative;" class="pb-3">
    <div class="px-4">
      <div class="row" v-if="categories">
        <template v-for="(category, index) in categories">
          <div :key="index" class="col-12 col-md-6 col-lg-6 col-xl-4">
            <div class="px-2">
              <karte-category :category="category"></karte-category>
            </div>
          </div>
        </template>
        <div class="col-12 col-md-6 col-lg-6 col-xl-4">
          <div class="px-2">
            <karte-category :category="klassiker"></karte-category>
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
          'Grillgerichte'
        ],
      }
    },
    components: {
      KarteCategory,
      KarteItem,
      Logo
    },
    methods: {
      fetchKarte: function(){
        axios.get('karte/get/'+this.categoryIndex[0]).then(response => {
          this.categories = this.chunk(response.data.karte, 14);
        }).catch(err => {console.log(err)});
        axios.get('karte/get/'+this.categoryIndex[1]).then(response => {
          this.klassiker.push(this.categoryIndex[1]);
          this.klassiker.push(response.data.karte);
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
  min-height: 100vh;
  width: 100%;
}
</style>
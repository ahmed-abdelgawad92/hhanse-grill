<template>
<div>
   <div id="paper_karte" ref="paper_karte">
      <div class="row mb-5">
         <div class="col-4">
            <div v-for="(category, index) in pane_1" :key="index" class="mb-1">
               <h4 class="header-paper">
                  <span v-if="category[0] != ''">{{category[0]}}</span>
               </h4>
               <div class="meal" v-for="(meal, index) in category[1]" :key="index">
                  <div class="row">
                     <div class="col-1">{{leadingZero(meal.number)}}.</div>
                     <div class="col-9">
                        {{meal.meal}}
                        <span class="ingredient">{{meal.ingredient}}</span>
                     </div>
                     <div class="col-2 text-right">{{meal.price | currency}}</div>
                  </div>
               </div>
            </div>
         </div>
         <div class="col-4">
            <div v-for="(category, index) in pane_2" :key="index" class="mb-1">
               <h4 class="header-paper">
                  {{category[0]}}
               </h4>
               <div class="meal" v-for="(meal, index) in category[1]" :key="index">
                  <div class="row">
                     <div class="col-1">{{leadingZero(meal.number)}}.</div>
                     <div class="col-9">
                        {{meal.meal}}
                        <span class="ingredient">{{meal.ingredient}}</span>
                     </div>
                     <div class="col-2 text-right">{{meal.price | currency}}</div>
                  </div>
               </div>
            </div>
         </div>
         <div class="col-4">
            <div v-for="(category, index) in pane_3" :key="index" class="mb-1">
               <h4 class="header-paper" v-if="category[0] != ''">
                  {{category[0]}}
               </h4>
               <div class="meal" v-for="(meal, index) in category[1]" :key="index">
                  <div class="row">
                     <div class="col-1">{{leadingZero(meal.number)}}.</div>
                     <div class="col-9">
                        {{meal.meal}}
                        <span class="ingredient">{{meal.ingredient}}</span>
                     </div>
                     <div class="col-2 text-right">{{meal.price | currency}}</div>
                  </div>
               </div>
            </div>
            <ul class="row py-3" style="background: #F0FD62;">
              <li>Alle Croques enthalten Gluten, Milch</li>
              <li>Zu jedem Croque gibt es Salat und Käse</li>
            </ul>
            <div class="row p-2" style="background: #F0FD62;">
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
      <div class="row pt-3">
         <div class="col-4">
            <div v-for="(category, index) in pane_4" :key="index" class="mb-1">
               <h4 class="header-paper">
                  {{category[0]}}
               </h4>
               <div class="meal" v-for="(meal, index) in category[1]" :key="index">
                  <div class="row">
                     <div class="col-1">{{leadingZero(meal.number)}}.</div>
                     <div class="col-9">
                        {{meal.meal}}
                        <span class="ingredient">{{meal.ingredient}}</span>
                     </div>
                     <div class="col-2 text-right">{{meal.price | currency}}</div>
                  </div>
               </div>
            </div>
         </div>
         <div class="col-4">
            <div v-for="(category, index) in pane_5" :key="index" class="mb-1">
               <h4 class="header-paper" v-if="category[0] != ''">
                  {{category[0]}}
               </h4>
               <div class="meal" v-for="(meal, index) in category[1]" :key="index">
                  <div class="row">
                     <div class="col-1">{{leadingZero(meal.number)}}.</div>
                     <div class="col-9">
                        {{meal.meal}}
                        <span class="ingredient">{{meal.ingredient}}</span>
                     </div>
                     <div class="col-2 text-right">{{meal.price | currency}}</div>
                  </div>
               </div>
            </div>
            <div class="p-2 text-center" style="background: #9F6E2D; color: white">
               Hinweis: wir frittieren nur mit 100% Pflanzenöl.
               <br>
               Cholesterinfrei und einem neutralen Geschmack. 
               <br>
               Unsere frischen Sorten enthalten wenig Fett.
            </div>
         </div>
         <div class="col-4 text-center pt-5">
            <img class="w-75" src="../../../assets/poster.png" alt="">
            <img class="w-75" src="../../../assets/address.png" alt="">
         </div>
      </div>
   </div>
   <button class="btn btn-primary" @click="savePdf">PDF Download</button>
   </div>
</template>

<script>
   import axios from 'axios';

   export default {
      data() {
         return {
            categories: null,
            pane_1: [],
            pane_2: [],
            pane_3: [],
            pane_4: [],
            pane_5: [],
            pane_6: [],
         }
      },
      methods: {
         fetchAllItems(){
            axios.get('karte').then(response => {
               if(Object.keys(response.data.karte).length > 0){
                  this.categories = response.data.karte;
                  this.pane_1.push(this.categories.Klassiker);
                  this.pane_1.push(this.categories.Fisch);
                  this.pane_1.push(this.categories.Croque);
                  this.pane_2.push(this.categories.Snacks);
                  this.pane_2.push(['Beilagen', this.categories.Beilagen[1].slice(0,12)]);
                  this.pane_3.push(['', this.categories.Beilagen[1].slice(12)]);
                  this.pane_3.push(this.categories.Grillgerichte);
                  // this.pane_3.push(this.categories.Salate);
                  let spar_menus = this.categories['Super-Spar-Menüs'][1];
                  console.log(spar_menus);
                  // this.pane_4.push(this.categories['Super-Spar-Menüs']);
                  this.pane_4.push(['Super-Spar-Menüs', spar_menus.slice(0, 24)]);
                  this.pane_5.push(['', spar_menus.slice(24)]);
                  this.pane_5.push(this.categories.Salate);
                  
                  
               }
               console.log(this.categories);
               
            }).catch(err=>{console.log(err);})
         },
         leadingZero(num){
            num = num + '';
            while(num.length < 3){
               num = '0' + num;
            }
            return num;
         },
         savePdf(){
            window.print();
         }
      },
      created() {
         this.fetchAllItems();
      }

   }
</script>

<style>
*{
   font-family: Times,serif;
}
@media print{
   body{
      background-color: black;
   }
}
#paper_karte{
   padding: 10px;
   background-color: black;
}
.header-paper{
   color: white;
   background-color: #9F6E2D;
   position: relative;
   padding: 5px 10px;
   font-size: 20pt;
}
.meal{
   font-size: 8pt;
   color: white;
}
.ingredient{
   font-size: 7pt;
   border-bottom: 1px dotted white;
}
/* A3 Landscape*/
@page {
    size: A3 landscape;
    margin: 10%;
}
</style>
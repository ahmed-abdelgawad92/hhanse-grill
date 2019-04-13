<template>
  <div class="container">
    <div class="text-center my-3">
      <button class="btn btn-primary" @click="lastWeek">&lt;&lt; Letzte Woche</button>
      <button class="btn btn-primary" @click="nextWeek">Nächste Woche &gt;&gt;</button>
    </div>
    <div class="speiseplan">
      <h1 class="my-3 text-center">Speiseplan</h1>
      <h1 class="big-header"><span>HH</span>anse Grill</h1>
      <h5 class="my-3 text-center">Das tägliche frische Program vom {{startDate}} bis {{endDate}}</h5>
      <h5 class="my-3 text-center" style="margin-bottom:50px !important;">Immer ab 11:00 Uhr, solange der Vorrat reicht.</h5>
      <div class="row border-btm" v-for="(plan, index) in weekPlan" :key='index'>
        <div class="col-12 col-sm-3 col-md-2">
          <p>{{plan.day}}</p>
        </div>
        <div class="col-12 col-sm-9 col-md-7">
          <ol v-if="plan.meals.length > 0">
            <li v-for="(item, index) in plan.meals" :key="index">
              <div class="row">
                <div class="col-9">
                  <strong>{{item.meal.name | capitalize}}</strong>
                  <template v-if="item.ingredients.length > 0">
                    , {{getIngredient(item.ingredients)}}
                  </template>
                </div>
                <div class="col-3 text-right">
                  <span>{{showPrice(item.price)}}</span>
                </div>
              </div>
            </li>
          </ol>
          <div v-else class="alert alert-warning">
            Sie haben kein Angebot an diesem Tag hinzugefügt
          </div>
        </div>
        <div class="col-6 col-sm-4 col-md-3 delete">
          <button @click="addMenuItem(plan.date)" class="btn btn-primary btn-block mb-3">Vorrat hinzufügen</button>
        </div>
      </div>
    </div>
    <div class="text-center my-3">
      <button class="btn btn-secondary" @click="print">Drucken</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data: () => {
      return {
        whichWeek: 0,
        weekPlan: [],
        startDate: '',
        endDate: ''
      }
    },
    methods: {
      fetchWeekPlan: function(){
        axios.get('weekplan/'+this.whichWeek).then(
          response => {
            this.weekPlan= response.data.weekPlan;
            this.startDate= new Date(response.data.startDate).toLocaleString('de-DE',{year: 'numeric', month:'numeric', day: 'numeric'});
            this.endDate= new Date(response.data.endDate).toLocaleString('de-DE',{year: 'numeric', month:'numeric', day: 'numeric'});
          },
          error => {console.log(error)}
        );
      },
      nextWeek: function(){
        this.whichWeek++;
        this.fetchWeekPlan();
      },
      lastWeek: function(){
        this.whichWeek--;
        this.fetchWeekPlan();
      },
      getIngredient: function(ing){
        let ingredient = ing.map(a => a.ingredient).join(', ');
        return ingredient;
      },
      showPrice: function(price){
        return (1 * price).toLocaleString('de-DE',{ style: 'currency', currency: 'EUR' });
      },
      addMenuItem: function(date){
        this.$router.push({
          path: '/year-calendar',
          query: {
            date: date
          }
        });
      },
      print: function(){
        window.print();
      }
    },
    created: function(){
      this.fetchWeekPlan();
    }
  }
</script>

<style scoped>
.border-btm{
  border-bottom: 1px solid #e7e7e7;
  padding-top: 15px;
}
ol{
  list-style-type: upper-roman;
}
.big-header{
  font-size: 4.5rem;
  text-align: center;
  margin-bottom: 70px;
}
.big-header span{
  font-size: 6rem !important;
  font-weight: bolder;
  color: red;
}
</style>
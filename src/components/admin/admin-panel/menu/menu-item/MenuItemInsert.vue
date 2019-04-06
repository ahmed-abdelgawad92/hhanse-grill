<template>
  <div>
    <h3 class="text-center text-muted">Ein Angebot hinzufügen</h3>
    <div v-if="success" style="position: fixed; top: 20px; right: 20px; z-index:100;">
      <div class="toast fade show" data-delay="3000" style="width:350px" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-success ">
          <strong class="mr-auto">Erfolgreiche Meldung</strong>
          <small class="text-muted">just now</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          Das Angebot ist erfolgreich hinzugefügt !
        </div>
      </div>
    </div>
    <form>
      <div class="form-group">
        <label for="meal">Das Gericht</label>
        <input class="form-control" type="text" 
          v-model.trim="meal" 
          @focus="mealsFilter"
          @input="mealsFilter" 
          @blur="removeList('m')"
          :class="{'is-invalid': $v.meal.$error}"
          placeholder="Gericht eingeben">
        <div class="invalid-feedback" v-if="!$v.meal.required">Der Preis kann nicht leer sein!</div>
        <ul class="list-group">
          <li
            v-for="(m, index) in filteredMeals" 
            :key="index"
            @click="addMeal(m.name)"
            class="list-group-item">{{m.name}}</li>
        </ul>
      </div>
      <div class="form-group">
        <label for="price">Die Beilage</label>
        <div class="input-group">
          <input class="form-control" type="text" 
            v-model.trim="ingredient" 
            @input="ingredientsFilter" 
            @focus="ingredientsFilter" 
            @blur="removeList(null)"
            placeholder="Beilage eingeben">
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button" @click="addIngredient(ingredient)">hinzufügen</button>
          </div>
        </div>
        <ul class="list-group">
          <li 
            v-for="(i, index) in filteredIngredients" 
            :key="index"
            @click="addIngredient(i.ingredient)"
            class="list-group-item">{{i.ingredient}}</li>
        </ul>
      </div>
      <div v-if="selectedIngredients.length > 0">
        <h5>Hinzugefügte Beilage</h5>
        <span v-for="(i, index) in selectedIngredients" :key="index" class="badge badge-secondary p-2 m-1">{{i}} <span @click="selectedIngredients.splice(index, 1)" class="span-close">&times;</span></span>
      </div>
      <div class="form-group">
        <label for="price">Der Preis</label>
        <div class="input-group">
          <input type="text" class="form-control" 
            v-model.lazy="price" 
            @blur="$v.price.$touch()" 
            :class="{'is-invalid': $v.price.$error}"
            placeholder="Preis eingeben">
          <div class="input-group-append">
            <span class="input-group-text">&euro;</span>
          </div>
          <div class="invalid-feedback" v-if="!$v.price.required">Der Preis kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.price.decimal">Der Preis muss ein Nummer sein!</div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="submit($event)">hinzufügen</button>
    </form>
  </div>
</template>

<script>
  import { required, minLength, decimal } from 'vuelidate/lib/validators';
  import axios from 'axios';

  export default {
    data: () => {
      return {
        meal: '',
        ingredient: '',
        selectedIngredients: [],
        price: '',
        filteredIngredients: [],
        filteredMeals: [],
        success: false
      }
    },
    props: ['date', 'meals', 'ingredients'],
    created: function(){
      this.filteredIngredients = this.ingredients;
      this.filteredMeals = this.meals;
    },
    methods: {
      removeList: function(m = null){
        setTimeout(() => {
          if(m !== null){
            this.$v.meal.$touch();
          }
          this.filteredIngredients = [];
          this.filteredMeals = [];
        }, 300);
      },
      ingredientsFilter: function() {
        this.filteredIngredients = this.ingredients.filter(item => item.ingredient.toLowerCase().indexOf(this.ingredient) !== -1);
      },
      mealsFilter: function() {
        this.filteredMeals = this.meals.filter(item => item.name.toLowerCase().indexOf(this.meal) !== -1);
      },
      addIngredient: function(ingredient) {
        if(ingredient && this.selectedIngredients.indexOf(ingredient) === -1){
          this.selectedIngredients.push(ingredient);
          this.ingredient = '';
        }else{
          this.ingredient = '';
        }
      },
      addMeal: function(meal) {
        if(meal){
          this.meal = meal;
        }
      },
      resetForm: function() {
        this.success = true;
        this.selectedIngredients = [];
        this.price = '';
        this.ingredient = '';
        this.meal = '';
        this.$v.$reset();
      },
      submit: function(event) {
        event.target.setAttribute('disabled','disabled');
        this.$v.$touch();
        if(!this.$v.$invalid){
          const data = {
            price: this.price,
            meal: this.meal,
            ingredients: this.selectedIngredients,
            date: this.date
          };
          axios.post('add_menu', data).then(
            response => {
              console.log(response);
              this.resetForm();
              setTimeout(() => {
                this.success = false;
              }, 3000);
              this.$emit('getAllIngredientsAndMeals');
              event.target.removeAttribute('disabled');
            },
            error => {
              console.log(error);
              event.target.removeAttribute('disabled');
            }
          );
        }else{
          event.target.removeAttribute('disabled');
        }
      }
    },
    validations:{
      meal: {
        required
      },
      price: {
        required,
        decimal
      }
    }
  }
</script>

<style scoped>
.list-group{
  position: absolute;
  right: 15px;
  left: 15px;
  z-index: 100;
  max-height: 300px;
  overflow: scroll;
}
.list-group-item:hover{
  cursor: pointer;
  background-color: rgb(237, 236, 236);
}
span.span-close{
  cursor: pointer;
}
</style>
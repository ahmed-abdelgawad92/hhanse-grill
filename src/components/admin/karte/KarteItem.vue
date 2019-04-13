<template>
  <div class="py-3 row">
    <div class="col-1">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="number"
               @blur="$v.number.$touch()"
               :class="{'is-invalid':$v.number.$error}"
               placeholder="Nummer">
      </div>
      <template v-else>
      {{item.number | articleNum}}.
      </template>
    </div>
    <div class="col-3">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="meal"
               @blur="$v.meal.$touch()"
               :class="{'is-invalid':$v.meal.$error}"
               placeholder="Gericht">
      </div>
      <strong v-else>{{item.meal}}</strong>
    </div>
    <div class="col-3 text-muted">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="ingredient"
               placeholder="Beilage oder Zutaten">
      </div>
      <template v-else>
        {{item.ingredient}}
      </template>
    </div>
    <div class="col-1">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="price"
               @blur="$v.price.$touch()"
               :class="{'is-invalid':$v.price.$error}"
               placeholder="Preis">
      </div>
      <template v-else>
        {{item.price | currency}}
      </template>
    </div>
    <!-- <div class="col-4">
      <img v-if="item.photo" :src="'http://localhost:8000/'+path" alt="">
    </div> -->
    <div class="col-2">
      <button v-if="edit" @click="edit=false" class="btn btn-primary btn-block">speichern</button>
      <button v-else @click="edit=true" class="btn btn-secondary btn-block">bearbeiten</button>
    </div>
    <div class="col-2">
      <button v-if="edit" @click="edit=false" class="btn btn-danger btn-block">abbrechen</button>
      <button v-else class="btn btn-danger btn-block">löschen</button>
    </div>
  </div>
</template>

<script>
  import { required, integer, decimal } from 'vuelidate/lib/validators';
  export default {
    data: () => {
      return {
        meal: '',
        ingredient: '',
        price: '',
        number: '',
        edit: false
      }
    },
    props: ['item'],
    computed: {
      path: function(){
        let path = 'storage/' + this.item.photo.split('/')[1];
        return path;
      }
    },
    created(){
      this.meal = this.item.meal;
      this.ingredient = this.item.ingredient;
      this.price = this.item.price;
      this.number = this.item.number;
      console.log(new Date());
      
    },
    validations: {
      number: {
        required,
        integer
      },
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
.row{
  margin-left: 0;
  margin-right: 0;
}
.form-group{
  margin-bottom: 0;
}
</style>
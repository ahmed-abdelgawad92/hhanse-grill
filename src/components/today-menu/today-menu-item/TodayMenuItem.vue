<template>
  <div :class="{'not-available' : !item.available}">
    <div class="p-2">
      <div class="row">
        <div class="col-9">
          <h2>
            <span>{{romanNumbers[item.row_order]}} -</span>
            {{item.meal.name | capitalize}}
            <span v-if="!item.available" class="withoutLine">&lt;Ausverkauft&gt;</span>
          </h2>
          <div class="ingredients">{{getIngredient()}}</div>
        </div>
        <div class="col-3">
          <h2 class="price">{{showPrice()}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      romanNumbers: ['0','I','II','III','IV','V','VI','VII','VIII','IX','X']
    }
  },
  props: ['item', 'index'],
  methods: {
    getIngredient: function(){
      let ingredient = this.item.ingredients.map(a => a.ingredient.charAt(0).toUpperCase() + a.ingredient.slice(1)).join(', ');
      return ingredient;
    },
    showPrice: function(){
      return (1 * this.item.price).toLocaleString('de-DE',{ style: 'currency', currency: 'EUR' });
    }
  }
}
</script>
<style scoped>
/* h2{
  padding: 20px;
  margin: 0 !important;
} */
h2{
  font-size: 3.2rem;
  font-family: 'Arial Black', Times, serif;
}
h2 span{
  font-family:'Times New Roman', Times, serif; 
  font-weight:bold; 
  font-size:3.2rem;
}
.ingredients{
  font-family: 'Arial', Times, serif;
  font-size: 2rem;
}
.price{
  text-align: right;
  font-family: 'Berkshire Swash', cursive;
}
.not-available div{
  text-decoration: line-through;
}
span.withoutLine{
  text-decoration: none !important;
  display: inline-block;
  padding: 0 0 0 5px;
}

@media screen and (max-width: 600px){
  h2, h2 span{
    font-size: 1rem;
    font-family: 'Arial Black', Times, serif;
  }
  .ingredients{
    font-family: 'Arial', Times, serif;
    font-size: 0.5rem;
  }
}
@media screen and (min-width: 600px) and (max-width: 900px){
  h2, h2 span{
    font-size: 1.2rem;
    font-family: 'Arial Black', Times, serif;
  }
  .ingredients{
    font-family: 'Arial', Times, serif;
    font-size: 0.8rem;
  }
}
@media screen and (min-width: 900px) and (max-width: 1200px){
  h2, h2 span{
    font-size: 1.5rem;
    font-family: 'Arial Black', Times, serif;
  }
  .ingredients{
    font-family: 'Arial', Times, serif;
    font-size: 1rem;
  }
}
</style>

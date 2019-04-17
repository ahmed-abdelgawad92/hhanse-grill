<template>
  <div class="container my-5">
    <h1 class="text-center my-5">HHanse Grill</h1>
    <div class="row">
      <div class="col-6">
        <router-link tag="div" to="/login" class="card">
          <div class="card-body text-center">
            <h1>Verwaltung</h1>
          </div>
        </router-link>
      </div>
      <div class="col-6">
        <router-link tag="div" to="/mittagstisch" class="card">
          <div class="card-body text-center">
            <h1>Mittagstisch</h1>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <router-link tag="div" to="/slideshow" class="card">
          <div class="card-body text-center">
            <h1>Slideshow</h1>
          </div>
        </router-link>
      </div>
      <div class="col-6">
        <router-link tag="div" to="/firstpage" class="card">
          <div class="card-body text-center">
            <h1>Erster Bildschirm</h1>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.card{
  cursor: pointer;
}
@media screen and (max-width: 600px){
  h1{
    font-size: 1rem;
  }
}
@media screen and (min-width: 600px) and (max-width: 900px){
  h1{
    font-size: 1.5rem;
  }
}
@media screen and (min-width: 900px) and (max-width: 1150px){
  h1{
    font-size: 2rem;
  }
}
</style>
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
</style>
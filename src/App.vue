<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
body {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 1, 3 */
}
@media print {
  button, footer, .delete{
    display: none !important;
  }
  .col-md-7 {
    flex: 0 0 75% !important;
    max-width: 75% !important;
  }
  p{
    font-size: 18px;
  }
  div{
    font-size: 20px;
  }
}
</style>

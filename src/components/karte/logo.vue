<template>
   <div>
      <h4 class="rotate"><span>HH</span>anse Grill &reg; حلال</h4>
   </div>
</template>

<script>
   export default {
      
   }
</script>

<style scoped>
div{
   position: absolute;
   bottom: 2px;
   right: 35px;
   
}
h4{
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   font-size: 2.5rem;
   color: white;
   text-shadow: 
      -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
   font-weight: 700;
}
span{
   color: red;
}
.rotate {
  animation: rotation 8s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(359deg);
  }
}
</style>
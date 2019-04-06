<template>
  <date-pick :hasInputElement="false" :weekdays="weekdays" :months="months" v-model="date" @input="returnDate"></date-pick>
</template>

<script>
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    components: {DatePick},
    data: () => {
        return {
          weekdays: [
            'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.'
          ],
          months: [
            'Januar', 'Februar', 'März', 'April',
            'Mai', 'Juni', 'Juli', 'August',
            'September', 'Oktober', 'November', 'Dezember'
          ]
        }
    },
    props: ['date'],
    methods: {
      returnDate: function(){
        this.$emit('dateChange', this.date)
      }
    }
  }
</script>

<style scoped>

</style>
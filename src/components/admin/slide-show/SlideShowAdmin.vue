<template>
    <div class="container">
        <h2 class="text-center my-5">Slideshow bearbeiten</h2>
        <button class="btn btn-primary my-3" v-b-modal.create-modal>Ein Eintrag hinzufügen</button>
        <div class="row" v-if="items.length > 0">
            <div class="col-3" v-for="item in items" :key="item.id">
                <slide-show-item :item="item" />
            </div>
        </div>
        <div v-else>
            <div class="alert alert-warning">Es gibt noch keine Einträge in Datenbank</div>
        </div>
        <b-modal title="Eintrag hinzufügen" id="create-modal" hide-footer>
            <slide-show-create />
        </b-modal>
    </div>
</template>

<script>
    import axios from 'axios';
    import SlideShowItem from './SlideShowItem';
    import SlideShowCreate from './SlideShowCreate';

    export default {
        data() {
            return {
                items: [],
            }
        },
        components: {
            SlideShowItem,
            SlideShowCreate
        },
        methods: {
            fetchItems() {
                axios.get('slideshow/items/fetch').then(response => {
                    this.items = response.data;
                }).catch(err => {console.log(err);});
            }
        },
        created() {
            this.fetchItems();
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="itunes col-sm-6">
        <h1>iTunes Search</h1>
        <div class="d-flex justify-content-around">
            <h4>Album:</h4>
            <h4>Track:</h4>
            <h4>Artist:</h4>
            <h4>Track Price:</h4>
        </div>
        <div v-for="song in searchResults">
            <div class="d-flex justify-content-between">
                <div class="col-3">
                    <img :src=song.artworkUrl100>
                </div>
                <div class="col-3">
                    <p>{{song.trackName}}</p>
                </div>
                <div class="col-3">
                    <p>{{song.artistName}}</p>
                </div>
                <div class="col-3">
                    <p>${{song.trackPrice}}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'iTunes',
        data() {
            return {

            }
        },
        computed: {
            searchResults() {
                return this.$store.state.searchResults
            }
        }
    }

</script>

<style>
    .itunes {
        text-align: center
    }
</style>
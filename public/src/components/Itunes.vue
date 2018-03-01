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
            <div class="row d-flex justify-content-between">
                <div class="col-3">
                    <img :src=song.artworkUrl100>
                    <button class="btn btn-outline-success" type="submit">Add to Playlist</button>
                </div>
                <div class="col-3">
                    <p>{{song.trackName}}</p>
                    <p><strong>{{song.collectionName}}</strong></p>
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
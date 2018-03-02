<template>
    <div class="my-tunes col-sm-6">
        <h1>List of MyTunes</h1>
        <button @click="getMyTunes">Get myTunes</button>
        <div class="d-flex justify-content-around">
            <h4>Album:</h4>
            <h4>Track:</h4>
            <h4>Artist:</h4>
            <h4>Track Price:</h4>
        </div>
        <div v-for="song in myTunes">
            <div class="row d-flex justify-content-between">
                <div class="col-3">
                    <img :src=song.artworkUrl100>
                    <button class="btn btn-outline-danger" @click="removeSong(song)">Remove</button>
                </div>
                <div class="col-3">
                    <p>{{song.trackName}}</p>
                    <p>
                        <strong>{{song.collectionName}}</strong>
                    </p>
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
    </div>
</template>

<script>
    export default {
        name: 'My-Tunes',
        data() {
            return {

            }
        },
        methods: {
            getMyTunes() {
                this.$store.dispatch('getMyTunes')
            },
            removeSong(song){
                this.$store.dispatch('removeSong', song)
            }
        },
        computed: {
            myTunes() {
                return this.$store.state.myTunes
            }
        }
    }

</script>

<style>
</style>
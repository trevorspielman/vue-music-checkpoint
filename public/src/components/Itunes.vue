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
                    <button class="btn btn-outline-success" @click="addToActivePlaylist(song)">Add to Playlist</button>
                </div>
                <div class="col-3">
                    <p>{{song.trackName}}</p>
                    <p>
                        <strong>{{song.collectionName}}</strong>
                    </p>
                    <audio controls class="players">
                        <source :src="song.previewUrl"> type="audio/mpeg</a>
                    </audio>
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
        props: ['song'],
        mounted() {
            },
            data() {
                return {

                }
            },
            methods: {
                addToActivePlaylist(song) {
                    let activePlaylistSongs = this.$store.state.activePlaylistSongs
                    console.log(activePlaylistSongs)
                    for (var i = 0; i < activePlaylistSongs.length; i++) {
                        var mySong = this.$store.state.activePlaylistSongs[i]
                        if (mySong.trackId == song.trackId) {
                            return alert(song.trackName + " is already on your playlist")
                        }
                    }
                    song.playlistId = this.$store.state.activePlaylist._id
                    console.log("this is my song:", song)
                    this.$store.dispatch('addToActivePlaylist', song)
                    this.$store.dispatch('addSongIdtoPlaylist', song)
                }
            },
            computed: {
                searchResults() {
                    return this.$store.state.searchResults
                },
                activePlaylist(){
                    return this.$store.state.activePlaylist
                }
            }
        }

</script>

<style>
    .itunes {
        text-align: center
    }
</style>
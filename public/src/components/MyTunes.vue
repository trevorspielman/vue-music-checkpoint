<template>
    <div class="my-tunes col-sm-6">
        <h1>List of MyTunes</h1>
        <div v-for="playlist in playlists">
            <h4 @click="setActivePlaylist(playlist)">{{playlist.name}}</h4>
        </div>
        <div class="d-flex justify-content-around">
            <h4>Album:</h4>
            <h4>Track:</h4>
            <h4>Artist:</h4>
            <h4>Track Price:</h4>
        </div>
        <div v-for="song in activePlaylistSongs">
            <div class="row d-flex justify-content-between">
                <div class="col-3">
                    <img :src=song.artworkUrl60>
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
                    <button @click="promoteSong(song)">Promote</button>
                    <button @click="demoteSong(song)">Demote</button>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    export default {
        name: 'My-Tunes',
        mounted() {
            this.$store.dispatch('getMyPlaylists')
        },
        data() {
            return {
            }
        },
        methods: {
            setActivePlaylist(playlist){
                this.$store.dispatch('setActivePlaylist', playlist)
                this.$store.dispatch('activePlaylistSongs', playlist)
            },
            removeSong(song) {
                this.$store.dispatch('removeSong', song)
            },
            // promoteSong(song) {
            //     var playlist = this.$store.state.myTunes
            //     console.log("This is my playlist:", playlist)
            //     for (var i = 0; i < playlist.length; i++) {
            //         var mySong = playlist[i]
            //         if (mySong._id == song._id) {
            //             playlist.splice(i, 1)
            //             playlist.splice(i - 1, 0, song)
            //             break
            //         }
            //     }
            //     this.$store.dispatch('promoteSong', playlist)
            // },
            demoteSong(song) {
                this.$store.dispatch('demoteSong', song)
            },
        },
        computed: {
            activePlaylist() {
                return this.$store.state.activePlaylist
            },
            playlists() {
                return this.$store.state.playlists
            },
            activePlaylistSongs(){
                return this.$store.state.activePlaylistSongs
            }
        }
    }

</script>

<style>
</style>
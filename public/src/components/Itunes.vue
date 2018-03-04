<template>
    <div class="itunes col-sm-6">
        <div class="row">
            <div class="col-12 searchHeader">
                <h2>iTunes Search</h2>
                <form class="m-3" @submit.prevent="searchItunes">
                    <input type="text" placeholder="Artist Name" v-model="artist">
                    <button class="btn-primary" type="submit">Search</button>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <h4>Album:</h4>
                            </th>
                            <th scope="col">
                                <h4>Track:</h4>
                            </th>
                            <th scope="col">
                                <h4>Artist:</h4>
                            </th>
                            <th scope="col">
                                <h4>Track Price:</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="song in searchResults">
                        <tr>
                            <td>
                                <img class="m-1" :src=song.artworkUrl60>
                                <audio controls class="players" v-on:play="pausePlayback">
                                    <source :src="song.previewUrl"> type="audio/mpeg</a>
                                </audio>
                            </td>
                            <td>
                                <p>{{song.trackName}}</p>
                                <p>
                                    <strong>{{song.collectionName}}</strong>
                                </p>
                            </td>
                            <td>
                                <p>{{song.artistName}}</p>
                            </td>
                            <td>
                                <p>${{song.trackPrice}}</p>
                                <i class="fas fa-plus fa-2x" @click="addToActivePlaylist(song)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            searchItunes(artist) {
                this.$store.dispatch('searchItunes', this.artist)
            },
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
                this.$store.dispatch('addSongIdtoActivePlaylist', song)
            },
            pausePlayback: function (play) { // event listener to identify the active player.
                var player = document.getElementsByClassName('players') //aliasing the players class
                for (let i = 0; i < player.length; i++) { //sorting through all players
                    if (player[i] != play.target) { //identifying if the player isn't the current one active
                        player[i].pause() //if it isn't then the current one active is paused.
                    }
                }
            }
        },
        computed: {
            searchResults() {
                return this.$store.state.searchResults
            },
            activePlaylist() {
                return this.$store.state.activePlaylist
            },
            activePlaylistToDB() {
                return this.$store.state.activePlaylistToDB
            }
        }
    }

</script>

<style scoped>
    .itunes {
        text-align: center
    }

    .searchHeader {
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h2 {
        font-family: 'Fira Sans', sans-serif;
    }

    p {
        font-family: 'Maven Pro', sans-serif;
    }
</style>
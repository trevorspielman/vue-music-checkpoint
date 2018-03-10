<template>
    <div class="itunes col-sm-6">
        <div class="row">
            <div class="col-12 searchHeader">
                <h2>iTunes Search</h2>
                <form class="form m-3" @submit.prevent="searchItunes">
                    <input class="formInput" type="text" placeholder="Artist Name" v-model="artist">
                    <button class="btn formBtn" type="submit">Search</button>
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
                                <h4>Track/Album:</h4>
                            </th>
                            <th scope="col">
                                <h4>Artist:</h4>
                            </th>
                            <th scope="col">
                                <h4>Price:</h4>
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
                                <p><strong>{{song.trackName}}</strong></p>
                                <p>
                                    {{song.collectionName}}
                                </p>
                            </td>
                            <td>
                                <p>{{song.artistName}}</p>
                            </td>
                            <td>
                                <p>${{song.trackPrice}}</p>
                                <i class="fas fa-plus fa-2x" @click="addSong(song)"></i>
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
                artist: ''
            }
        },
        methods: {
            searchItunes(artist) {
                this.$store.dispatch('searchItunes', this.artist)
            },
            addSong(song) {
                let activePlaylistSongs = this.$store.state.activePlaylist.songs
                for (var i = 0; i < activePlaylistSongs.length; i++) {
                    var mySong = activePlaylistSongs[i]
                    if (mySong.trackId == song.trackId) {
                        return alert(song.trackName + " is already on your playlist")
                    }
                }
                song.playlistId = this.$store.state.activePlaylist._id
                var activePlaylist = this.activePlaylist
                activePlaylist.songs.push(song)
                this.$store.dispatch('addSong', song)
                // this.$store.dispatch('putToDBPlaylist', activePlaylist)
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
            // activePlaylistToDB() {
            //     return this.$store.state.activePlaylistToDB
            // }
        }
    }

</script>

<style scoped>
    .formInput {
        border: 2px solid purple;
        border-radius: 5px;
        background-color: rgba(100, 100, 100, 0.541);
        color: whitesmoke;
        height: 38px;
        background-position: 10px 10px;
        background-image: url('../assets/searchicon.png');
        background-repeat: no-repeat;
        padding-left: 40px
    }

    .formBtn {
        background: purple;
        color: whitesmoke;
    }

    .itunes {
        text-align: center;
        background: linear-gradient(to left, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.7)), url("../assets/headerbg.jpg");
        color: whitesmoke;
        background-size: fill;
        background-attachment: fixed
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
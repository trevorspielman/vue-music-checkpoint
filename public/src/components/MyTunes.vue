<template>
    <div class="my-tunes col-sm-6">
        <div class="row">
            <div class="col-12 d-flex align-items-center justify-content-center playlistHeader">
                <h2 class="d-inline-flex">MyTunes</h2>
                <button class="btn playlistBtn dropdown-toggle m-3" data-toggle="dropdown">
                    Playlists:
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="playlist in playlists" href="#">
                        <p class="dropdown-o vgft56ption" @click="setActivePlaylist(playlist)">{{playlist.name}}</p>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table">
                    <thead>
                        <th scope="col">
                            <h4>Album:</h4>
                        </th>
                        <th scope="col">
                            <h4>Track:</h4>
                        </th>
                        <th scope="col">
                            <h4>Artist:</h4>
                        </th>
                        <th></th>
                    </thead>
                    <tbody v-for="song in activeSongs">
                        <tr>
                            <td>
                                <img :src=song.artworkUrl60>
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
                                <i class="fas fa-sort-amount-up fa-2x" @click="promoteSong(song)"></i>
                                <i class="fas fa-sort-amount-down fa-2x" @click="demoteSong(song)"></i>
                                <i class="fas fa-ban fa-2x" @click="removeSong(song)"></i>
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
        name: 'My-Tunes',
        mounted() {
            this.$store.dispatch('getMyPlaylists')

        },
        data() {
            return {
            }
        },
        methods: {
            setActivePlaylist(playlist) {
                this.$store.dispatch('setActivePlaylist', playlist)
                this.$store.dispatch('setActiveSongs', playlist)
                // this.$store.dispatch('songOrder', playlist)
            },
            removeSong(song) {
                this.$store.dispatch('removeSong', song)
            },
            promoteSong(song) {
                var songOrder = this.$store.state.activePlaylist.songs
                var arrIndex = -1
                for (var i = 0; i < songOrder.length; i++) {
                    var mySong = songOrder[i]
                    if (mySong.trackId == song.trackId) {
                        songOrder.splice(i, 1)
                        songOrder.splice(i - 1, 0, song)
                        break
                    }
                }
                var activePlaylist = this.activePlaylist
                activePlaylist.songs = songOrder
                // this.$store.dispatch('putActivePlaylist', activePlaylist)
            },
            demoteSong(song) {
                var playlist = this.$store.state.activePlaylistSongs
                console.log("This is my playlist:", playlist)
                for (var i = 0; i < playlist.length; i++) {
                    var mySong = playlist[i]
                    if (mySong._id == song._id) {
                        playlist.splice(i, 1)
                        playlist.splice(i + 1, 0, song)
                        break
                    }
                }
                this.$store.dispatch('demoteSong', playlist)
            },
        },
        computed: {
            activePlaylist() {
                return this.$store.state.activePlaylist
            },
            playlists() {
                return this.$store.state.playlists
            },
            activeSongs(){
                return this.$store.state.activeSongs
            }
        }
    }

</script>

<style scoped>
    .dropdown-option{
        padding: 0px
    }
    .dropdown-item{
        color: whitesmoke;
        display: flex;
        align-content: center
    }
    .dropdown-item:hover{
        background-color: rgba(128, 0, 128, 0.541)
    }
    .dropdown-menu{
        border: 2px solid purple;
        border-radius: 5px;
        background-color: rgba(100, 100, 100, 0.541);
    }
    .playlistBtn{
        background: purple;
        color: whitesmoke;
    }
    .my-tunes{
        background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.7)), url("../assets/headerbg.jpg");
        color: whitesmoke;
        background-size: fill;
        background-attachment: fixed
    }
    .playlistHeader{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 4rem
    }
    h2{
        font-family: 'Fira Sans', sans-serif;
    }
    p{
        font-family: 'Maven Pro', sans-serif;
    }
</style>
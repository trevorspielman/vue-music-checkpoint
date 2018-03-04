<template>
    <div class="my-tunes col-sm-6">
        <div class="row">
            <div class="col-12 d-flex align-items-center justify-content-center playlistHeader">
                <h2 class="d-inline-flex">MyTunes</h2>
                <button class="btn btn-secondary dropdown-toggle m-3" data-toggle="dropdown">
                    Playlists:
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="playlist in playlists" href="#">
                        <p @click="setActivePlaylist(playlist)">{{playlist.name}}</p>
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
                    <tbody v-for="song in activePlaylistSongs">
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
                this.$store.dispatch('activePlaylistSongs', playlist)
            },
            removeSong(song) {
                this.$store.dispatch('removeSong', song)
            },
            promoteSong(song) {
                console.log('active playlist:', this.$store.state.activePlaylist.name)
                var songOrder = this.$store.state.activePlaylist.songs
                var playlist = this.$store.state.activePlaylistSongs
                var arrIndex = -1
                console.log('song order', songOrder)
                console.log("This is my playlist:", this.$store.state.activePlaylistSongs)
                // for (var x = 0; x < songOrder.length; x++) {
                //     var trackId = songOrder[x]
                //     for (var i = 0; i < playlist.length; i++) {
                //         var mySong = playlist[i]
                //         if (mySong.trackId == trackId) {
                //             arrIndex = i
                //         }
                //     }
                //     var promoted = playlist.splice(arrIndex, 1)
                //     playlist.splice(i - 1, 0, promoted[0])
                //     break
                //     // return playlist
                // }
                for (var i = 0; i < playlist.length; i++) {
                    var mySong = playlist[i]
                    if (mySong._id == song._id) {
                        playlist.splice(i, 1)
                        playlist.splice(i - 1, 0, song)
                        break
                    }
                }
                console.log('this is my promoted playlist:', playlist)
                this.$store.dispatch('promoteSong', playlist)
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
            activePlaylistSongs() {
                return this.$store.state.activePlaylistSongs
            },
            activePlaylistToDB() {
                return this.$store.state.activePlaylistToDB
            }
        }
    }

</script>

<style scoped>
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
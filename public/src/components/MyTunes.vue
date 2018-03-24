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
                        <p class="dropdown-option" @click="setActivePlaylist(playlist)">{{playlist.name}}</p>
                        <i class="fas fa-ban fa-2x" @click="removePlaylist(playlist)"></i>
                    </a>
                    <span>
                        <form action="submit" class="dropdown-item playlistForm" @submit.prevent="createPlaylist">
                            <input class="formInput" type="text" placeholder="Playlist Name" v-model="newPlaylist.name">
                            <button class="btn formBtn m-1" type="submit">Create</button>
                        </form>
                    </span>
                </div>
            </div>
            <div class="col-12 d-flex align-items-center justify-content-center ">
                <h3 class="m-1">{{activePlaylist.name}}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table">
                    <thead>
                        <th scope="col">
                            <h4>Cover:</h4>
                        </th>
                        <th scope="col">
                            <h4>Track/Album:</h4>
                        </th>
                        <th scope="col">
                            <h4>Artist:</h4>
                        </th>
                        <th></th>
                    </thead>
                    <tbody v-for="song in activePlaylist.songs">
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
                newPlaylist: {
                    name: '',
                    songs: []
                }
            }
        },
        methods: {
            createPlaylist() {
                this.$store.dispatch('createPlaylist', this.newPlaylist)
            },
            setActivePlaylist(playlist) {
                this.$store.dispatch('setActivePlaylist', playlist)
                // this.$store.dispatch('songOrder', playlist)
            },
            removePlaylist(playlist){
                this.$store.dispatch('removePlaylist', playlist)
            },
            removeSong(song) {
                this.$store.dispatch('removeSong', song)
                this.$store.dispatch('activePlaylistSongsRemoval', song)
            },
            promoteSong(song) {
                var songOrder = []
                var playlist = this.$store.state.activePlaylist.songs
                for (var i = 0; i < playlist.length; i++) {
                    var mySong = playlist[i]
                    if (mySong._id == song._id) {
                        if (i == 0) {
                            alert("This is already at the top of your list!")
                            return
                        }
                        playlist.splice(i, 1)
                        playlist.splice(i - 1, 0, song)
                    }
                }
                for (let x = 0; x < playlist.length; x++) {
                    const song = playlist[x];
                    songOrder[x] = song._id

                }
                var activePlaylist = this.$store.state.activePlaylist
                this.$store.dispatch('updatePlaylist', { playlist: activePlaylist, order: songOrder })
            },
            demoteSong(song) {
                var songOrder = []
                var playlist = this.$store.state.activePlaylist.songs
                for (var i = 0; i < playlist.length; i++) {
                    var mySong = playlist[i]
                    if (mySong._id == song._id) {
                        if (i == playlist.length - 1) {
                            alert("This is already at the bottom of your list!")
                            return
                        }
                        playlist.splice(i, 1)
                        playlist.splice(i + 1, 0, song)
                    }
                }
                for (let x = 0; x < playlist.length; x++) {
                    const song = playlist[x];
                    songOrder[x] = song._id

                }
                var activePlaylist = this.$store.state.activePlaylist
                this.$store.dispatch('updatePlaylist', { playlist: activePlaylist, order: songOrder })
            },
            pausePlayback: function (play) { // event listener to identify the active player.
                var player = document.getElementsByClassName('players') //aliasing the players class
                for (let i = 0; i < player.length; i++) { //sorting through all players
                    if (player[i] != play.target) { //identifying if the player isn't the current one active
                        player[i].pause() //if it isn't then the current one active is paused.
                    }
                }
            },
        },
        computed: {
            activePlaylist() {
                return this.$store.state.activePlaylist
            },
            playlists() {
                return this.$store.state.playlists
            },
            activeSongs() {
                return this.$store.state.activeSongs
            }
        },
        watch: {
            playlists: function (newPlaylists, oldPlaylists) {
                this.$store.dispatch('getMyPlaylists', newPlaylists)
            }
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
        padding-left: 40px;
        width: 75%;
    }

    .formBtn {
        background: purple;
        color: whitesmoke;
    }

    .dropdown-option {
        padding: 0px;
        margin-bottom: 4px;
    }

    .dropdown-item {
        color: whitesmoke;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .playlistForm{
        padding-left: 5px;
        padding-right: 5px;
    }

    .dropdown-item:hover {
        background-color: rgba(128, 0, 128, 0.541)
    }

    .dropdown-menu {
        border: 2px solid purple;
        border-radius: 5px;
        background-color: rgba(100, 100, 100, 0.9);
        width: 15vw;
    }

    .playlistBtn {
        background: purple;
        color: whitesmoke;
    }

    .my-tunes {
        background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.7)), url("../assets/headerbg.jpg");
        color: whitesmoke;
        background-size: fill;
        background-attachment: fixed
    }

    .playlistHeader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 4rem
    }

    h2 {
        font-family: 'Fira Sans', sans-serif;
    }

    p {
        font-family: 'Maven Pro', sans-serif;
    }
</style>
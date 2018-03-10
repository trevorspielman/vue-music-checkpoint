import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'


vue.use(vuex)

var url = '//bcw-getter.herokuapp.com/?url=';
var url2 = 'https://itunes.apple.com/search?term=';

let itunesApi = axios.create({
  baseURL: url + encodeURIComponent(url2), // base url with our own API key
  timeout: 30000,
})

let myTunesDB = axios.create({
  baseURL: '//localhost:3000/api/',
  timeout: 30000,
})

var store = new vuex.Store({
  state: {
    searchResults: [],
    playlists: [],
    activePlaylist: {},
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results
    },
    setMyPlaylists(state, results) {
      state.playlists = results
    },
    setActivePlaylist(state, results) {
      state.activePlaylist = results
      console.log('active playlist', results.name, results._id)
    },

    activePlaylistChanges(state, results) {
      state.activePlaylist.songs.push(results.trackId)
      console.log('my playlist track IDs', state.activePlaylist.songs)
    },
    // activePlaylistToDB(state, results) {
    //   var playlists = state.playlists
    //   for (let i = 0; i < playlists.length - 1; i++) {
    //     if (playlists[i]._id == results._id) {
    //       playlists[i].songs = results.songs
    //       console.log('This is my DB songs Arr', playlists[i])
    //     }
    //   }
    // }
  },
  actions: {
    searchItunes({ commit, dispatch }, artist) {
      itunesApi.get(artist)
        .then(res => {
          commit('setSearchResults', res.data.results)
        })
    },
    getMyPlaylists({ commit, dispatch }) {
      myTunesDB.get('playlists')
        .then(res => {
          commit('setMyPlaylists', res.data)
        })
    },
    setActivePlaylist({ commit, dispatch }, payload) {
      commit('setActivePlaylist', payload)
    },
    addSong({ commit, dispatch }, song) {
      console.log("Added Song", song)
      myTunesDB.post('playlists/' + song.playlistId + '/songs', song)
        .then(res => {
          dispatch('addToPlaylist', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    addToPlaylist({ commit, dispatch }, payload) {
      console.log("add to playlist payload:", payload)
      myTunesDB.post('playlists/' + payload.playlistId, payload)
        .then(res => {
          console.log("Set Active Playlist is using this data", res, "Could it use payload?", payload)
          commit('setActivePlaylist', res.data)
        })
    },
    activePlaylistSongsRemoval({ commit, dispatch }, payload) {
      myTunesDB.put('playlists/' + payload + '/songs')
        .then(res => {
          commit('setActivePlaylistSongs', res.data)
          dispatch('putActivePlaylist', store.state.activePlaylist)
          console.log(store.state.activePlaylist)
        })
        .catch(err => {
          console.error(err)
        })
    },
    removeSong({ commit, dispatch }, song) {
      myTunesDB.delete('playlists/' + song.playlistId + "/songs/" + song._id)
        .then(res => {
        })
        .catch(err => {
          console.error(err)
        })
    },

  }
})

export default store

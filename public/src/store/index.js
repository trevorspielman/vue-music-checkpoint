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
    // activeSongs: []
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
    // setActiveSongs(state, results) {
    //   state.activeSongs = results
    // },
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
      myTunesDB.get('playlists/' + payload._id + '/songs')
        .then(res => {
          commit('setActivePlaylist', payload)
          // commit('setActiveSongs', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    addSong({ commit, dispatch }, song) {
      console.log("Added Song", song)
      myTunesDB.post('playlists/' + song.playlistId + '/songs', song)
        .then(res => {
          dispatch('addToDBPlaylist', res.data)
          dispatch('setActivePlaylist', store.state.activePlaylist)
        })
        .catch(err => {
          console.error(err)
        })
    },
    addToDBPlaylist({ commit, dispatch }, payload) {
      myTunesDB.post('playlists/' + payload.playlistId, payload)
        .then(res => {
          commit('setActivePlaylist', res.data)
        })
    },
    activePlaylistSongsRemoval({ commit, dispatch }, payload) {
      myTunesDB.put('playlists/' + payload.playlistId, payload)
        .then(res => {
          commit('setActivePlaylist', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    removeSong({ commit, dispatch }, song) {
      myTunesDB.delete('playlists/' + song.playlistId + '/songs/' + song._id)
        .then(res => {
        })
        .catch(err => {
          console.error(err)
        })
    },

  }
})

export default store

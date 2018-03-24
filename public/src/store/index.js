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

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//vue-music-trevor.herokuapp.com/' : '//localhost:3000/';

let myTunesDB = axios.create({
  baseURL: baseUrl + 'api/',
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
        })
        .catch(err => {
          console.error(err)
        })
    },
    createPlaylist({ commit, dispatch }, payload) {
      myTunesDB.post('playlists', payload)
        .then(res => {
          commit('setMyPlaylists', res.data)
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
    updatePlaylist({ commit, dispatch }, payload) {
      myTunesDB.put('playlists/' + payload.playlist._id + '/songs/', payload.order)
        .then(res => {
          console.log("update data res: ", res.data)
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
    removePlaylist({ commit, dispatch }, payload) {
      myTunesDB.delete('playlists/' + payload._id)
        .then(res => {
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
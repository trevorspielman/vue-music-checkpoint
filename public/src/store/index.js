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
    myTunes: [],
    searchResults: []
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results
      console.log(results)
    },
    setMyPlaylist(state, results) {
      state.myTunes = results
    },
    addSong(state, results) {
      state.myTunes = results
      console.log(state.myTunes)
    },
  },
  actions: {
    searchItunes({ commit, dispatch }, artist) {
      itunesApi.get(artist)
        .then(res => {
          console.log(res.data.results)
          commit('setSearchResults', res.data.results)
        })
    },
    getMyTunes({ commit, dispatch }) {
      myTunesDB.get('playlists')
        .then(res => {
          commit('setMyPlaylist', res.data)
          console.log("my playlist:", res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    addToMyTunes({ commit, dispatch }, song) {
      myTunesDB.post('playlists', song)
        .then(res => {
          commit('addSong', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    removeSong({ commit, dispatch }, song) {
      myTunesDB.delete('playlists/' + song._id)
        .then(res => {
          dispatch('getMyTunes')
        })
        .catch(err => {
          console.error(err)
        })
    },
    promoteTrack({ commit, dispatch }, track) {
      //this should increase the position / upvotes and downvotes on the track
    },
    demoteTrack({ commit, dispatch }, track) {
      //this should decrease the position / upvotes and downvotes on the track
    }

  }
})

export default store

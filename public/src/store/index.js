import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'


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
    }
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
      //this should send a get request to your server to return the list of saved tunes
    },
    addToMyTunes({ commit, dispatch }, track) {
      //this will post to your server adding a new track to your tunes
    },
    removeTrack({ commit, dispatch }, track) {
      //Removes track from the database with delete
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

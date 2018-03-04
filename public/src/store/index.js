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
    activePlaylistSongs: [],
    searchResults: [],
    playlists: [],
    activePlaylist: {},
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results
    },
    setActivePlaylist(state, results) {
      state.activePlaylist = results
      console.log('active playlist',results.name, results._id)
    },
    setActivePlaylistSongs(state, results) {
      state.activePlaylistSongs = results
    },
    addSong(state, results) {
      state.activePlaylistSongs.push(results)
    },
    promotedPlaylist(state, results) {
      state.activePlaylistSongs = results
    },
    setMyPlaylists(state, results) {
      state.playlists = results
    },
    activePlaylistChanges(state, results){
      state.activePlaylist.songs.push(results.trackId)
      console.log('my playlist track IDs', state.activePlaylist.songs)
    },
    activePlaylistToDB(state, results){
      var playlists = state.playlists
      for (let i = 0; i < playlists.length - 1; i++) {
        if(playlists[i]._id == results._id){
          playlists[i].songs = results.songs
          console.log('This is my DB songs Arr', playlists[i])
        }
      }
    }
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
    activePlaylistSongs({ commit, dispatch }, payload) {
      myTunesDB.get('playlists/' + payload._id + '/songs')
        .then(res => {
          commit('setActivePlaylistSongs', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    addSongIdtoActivePlaylist({commit, dispatch}, song){
      myTunesDB.get('playlists/' + song.playlistId, song)
      .then(res=>{
        commit('activePlaylistChanges', song)
      })
      .catch(err => {
        console.error(err)
      })
    },
    putActivePlaylist({commit, dispatch}, payload){
      myTunesDB.put('playlists/' + payload._id, payload)
      .then(res=>{
        commit('activePlaylistToDB', payload)
      })
    },
    activePlaylistSongsRemoval({ commit, dispatch }, payload) {
      myTunesDB.get('playlists/' + payload + '/songs')
        .then(res => {
          commit('setActivePlaylistSongs', res.data)
          dispatch('putActivePlaylist', store.state.activePlaylist)
          console.log(store.state.activePlaylist)
        })
        .catch(err => {
          console.error(err)
        })
    },
    addToActivePlaylist({ commit, dispatch }, song) {
      myTunesDB.post('songs', song)
        .then(res => {
          commit('addSong', res.data)
          dispatch('putActivePlaylist', store.state.activePlaylist)
        })
        .catch(err => {
          console.error(err)
        })
    },
    removeSong({ commit, dispatch }, song) {
      myTunesDB.delete('playlists/' + song.playlistId + "/songs/" + song._id)
        .then(res => {
          dispatch('activePlaylistSongsRemoval', res.data.playlistId)
        })
        .catch(err => {
          console.error(err)
        })
    },
    promoteSong({ commit, dispatch }, payload) {
      console.log("this is my promoted:", payload)
      myTunesDB.put('playlists/' + payload[0].playlistId, payload)
        .then(res => {
          commit('activePlaylistToDB', payload)
        })
    },
    demoteSong({ commit, dispatch }, song) {
      //this should decrease the position / upvotes and downvotes on the track
    }

  }
})

export default store

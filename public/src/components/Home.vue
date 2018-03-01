<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <h1>Welcome to My-Tunes!</h1>
      </div>
      <form class="col-sm-12" @submit.prevent="searchItunes">
        <input type="text" placeholder="Artist Name" v-model="artist">
        <button class="btn-primary" type="submit">Search Itunes</button>
      </form>
    </div>
    <div class="row">
      <itunes class="itunes"></itunes>
      <my-tunes class="my-tunes"></my-tunes>
    </div>
  </div>
</template>

<script>
  import MyTunes from './MyTunes.vue'
  import Itunes from './Itunes.vue'
  export default {
    name: 'home',
    data() {
      return {
        artist: ''
      }
    },
    methods: {
      searchItunes(artist) {
        this.$store.dispatch('searchItunes', this.artist)
      }
    },
    components: {
      Itunes,
      MyTunes
    }
  }
</script>


<style>
  .my-tunes {
    display: inline-block;
    min-height: 500px;
    min-width: 50%;
    background: green;
  }

  .itunes {
    display: inline-block;
    background: red;
    min-height: 500px;
    min-width: 45%;
  }
</style>
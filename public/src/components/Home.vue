<template>
  <div class="home container-fluid">
    <div class="row header">
      <div class="col-sm-12 d-flex justify-content-center">
        <h1>Welcome to My-Tunes!</h1>
      </div>

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
    },
    components: {
      Itunes,
      MyTunes
    }
  }
</script>


<style scoped>
  h1{
    font-family: 'Pacifico', cursive;
    color: blue
  }
  .header{
    min-height: 4rem;
    height: 6rem;
    background-color: rgba(0,0,0,.7);
    align-items: center
  }
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
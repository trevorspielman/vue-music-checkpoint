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
    color: purple;
    font-size: 4rem
  }
  .header{
    min-height: 4rem;
    height: 7rem;
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8));
    align-items: center;
    border-bottom: 4px solid purple
  }

  .itunes {
    display: inline-block;
    min-height: 100vh;
  }
</style>
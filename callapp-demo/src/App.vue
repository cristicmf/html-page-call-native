<template>
  <div id="app">
    <bottom-bar />
  </div>
</template>
<script>
import BottomBar from './components/BottomBar'
export default {
  name: 'app',
  data () {
    return {}
  },
  beforeCreate () {
  },
  components: {
    BottomBar
  }
}
</script>
<style>
@import './assets/css/person.css';
</style>

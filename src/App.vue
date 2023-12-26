<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>Restaurants App</v-app-bar-title>
    </v-app-bar>
    <RestaurantList />
  </v-app>
</template>

<script>
import RestaurantList from './components/RestaurantList.vue'

export default {
  name: 'App',
  components: {
    RestaurantList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

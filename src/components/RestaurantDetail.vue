<template>
  <v-card max-width="800">
    <v-img
      v-if="imageUrl"
      :src="`${imageUrl}`" alt=""
      cover
    ></v-img>
    <v-card-title class="mt-4">
      <h1>{{ name }}</h1>
      <strong>Rating: {{ rate }}</strong>
    </v-card-title>
    <v-card-subtitle>
      {{ categories }}
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      <p>
        {{ description }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" @click="deleteRestaurant" >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

  import client from '../api/client';

  export default {

    name: 'RestaurantDetail',

    props: {
      id: Number,
      name: String,
      description: String,
      rate: Number,
      image: Object,
      categories: Object,
    },

    computed: {
      imageUrl() {
        if (this.image && this.image.data !== null) {
          return this.image.data.attributes.formats.small.url;
        }
        return null
      }
    },

    methods: {

      async deleteRestaurant() {
        const response = await client.deleteRestaurant(this.id);
        const jsonResponse = await response.json()
        const { data } = jsonResponse;
        if (data.id) {
          this.$emit('success')
        }
      }

    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.restaurant-detail {
  background-color: #fafafa;
  border: 1px solid #ddd;
  margin: 1em;
  padding: 1em;
}

</style>
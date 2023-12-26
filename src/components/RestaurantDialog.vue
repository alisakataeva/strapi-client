<template>
  <v-dialog v-model="open" width="800">
    <template v-slot:default="">
      <v-card title="Dialog">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Restaurant Name*"
                  required
                  v-model="restaurant.Name"
                ></v-text-field>
                <v-text-field
                  label="Description"
                  required
                  v-model="restaurant.Description"
                ></v-text-field>
                <v-text-field
                  label="Rating"
                  type="number"
                  required
                  v-model="restaurant.Rating"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="show=false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="saveRestaurant"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>

  import client from '../api/client';

  export default {

    name: 'RestaurantDialog',

    props: {
      value: Boolean
    },

    data: () => ({
      open: false,
      restaurant: {},
    }),

    computed: {
      show: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('close', value)
        }
      }
    },

    created() {
      
    },

    methods: {

      async saveRestaurant() {
        const response = await client.saveRestaurant(this.restaurant);
        const jsonResponse = await response.json();
        const { data } = jsonResponse;
        if (data.id) {
          this.restaurant = {};
          this.$emit('success');
        }
      }

    }

  }
</script>
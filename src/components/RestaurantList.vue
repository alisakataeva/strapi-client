<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" class="mb-4" @click="openDialog">
          + New Restaurant
        </v-btn>
        <v-divider></v-divider>
        <div class="restaurant-list">
          <v-container>
            <v-row>
              <v-col v-for="(r, ix) in restaurantList" :key="ix">
                <v-card
                  @click="selectedRestaurant=r"
                  class="mx-auto"
                  width="250"
                  hover
                >
                  <v-card-item>
                    <v-card-title>
                      {{ r.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ r.categories }}
                    </v-card-subtitle>
                  </v-card-item>

                  <v-card-text>
                    <img
                      v-if="r.image.data"
                      :src="`${r.image.data.attributes.formats.thumbnail.url}`" alt=""
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-pagination
            v-model="page"
            :length="pageCount"
            rounded="circle"
            @update:modelValue="update"
          ></v-pagination>
        </div>
      </v-col>
      <v-col>
        <template v-if="selectedRestaurant.id">
          <RestaurantDetail
            :id="selectedRestaurant.id"
            :name="selectedRestaurant.name"
            :description="selectedRestaurant.description"
            :rate="selectedRestaurant.rate"
            :image="selectedRestaurant.image"
            :categories="selectedRestaurant.categories"
            @success="deleteSuccess"
          />
        </template>
      </v-col>
    </v-row>
  </v-container>
  <RestaurantDialog v-model="dialog" @close="dialog=false" @success="saveSuccess" />
</template>

<script>
  import RestaurantDetail from './RestaurantDetail.vue';
  import RestaurantDialog from './RestaurantDialog.vue';

  import client from '../api/client';

  export default {

    name: 'RestaurantList',

    components: {
      RestaurantDetail,
      RestaurantDialog
    },

    props: {
      msg: String
    },

    data: () => ({
      restaurantList: [],
      selectedRestaurant: {},

      dialog: false,
      page: 1,
      pageSize: 3,
      pageCount: 1,
    }),

    watch: {
      
    },

    created() {
      this.getData();
    },

    methods: {

      update() {
        this.getData();
      },

      async getData() {
        const response = await client.getRestaurants(this.page, this.pageSize);
        const jsonResponse = await response.json()
        const { meta, data } = jsonResponse;

        this.restaurantList = [];
        for (let i = 0; i < data.length; i++) {
          this.restaurantList.push(this.formatRestaurant(data[i]));
        }

        const { page, pageSize, pageCount } = meta.pagination;
        this.page = page;
        this.pageSize = pageSize;
        this.pageCount = pageCount;
      },

      getCategories(r) {
        if (r.attributes.categories && r.attributes.categories.data !== null) {
          let arr = r.attributes.categories.data.map(cat => cat.attributes.Name);
          return arr.join(", ");
        }
        return null
      },

      formatRestaurant(r) {
        return {
          id: r.id,
          name: r.attributes.Name,
          description: r.attributes.Description,
          rate: r.attributes.Rating,
          image: r.attributes.Image,
          categories: this.getCategories(r),
        }
      },

      openDialog() {
        this.dialog = true;
      },

      saveSuccess() {
        this.dialog = false;
        this.getData();
      },

      deleteSuccess() {
        this.selectedRestaurant = {}
        this.getData();
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

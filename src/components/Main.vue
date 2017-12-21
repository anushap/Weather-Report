<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h5>Add a city to get the weather report</h5>
    <div style="margin-top:30px;">
      <label>City:</label>
      <input type="text" v-model="cityName"/>
      <button @click="addCity()">Add</button>
    </div>
    <div style="margin-top:10px;" v-for="city in cities">
      <router-link :to="{ name: 'Report', params: { name: city.name }}">
        {{city.name}}
      </router-link>
      <button v-if="city.name != ''" style="margin-left:10px" @click="deleteCity(city.name)">Delete</button></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Main',
    data () {
      return {
        msg: 'Weather Report App',
        cityName: '',
        cities: [],
        computed: {
          ...mapState([
        'cities'
      ])
    }
    }
    },
    mounted: function () {
      this.cities = this.$store.getters.cities;
    },
    methods: {
      addCity () {
        this.$store.dispatch('ADD', this.cityName)
        this.cities = this.$store.getters.cities
        this.cityName = ''
      },
      deleteCity (city) {
        this.$store.dispatch('DELETE', city)
        this.cities = this.$store.getters.cities
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

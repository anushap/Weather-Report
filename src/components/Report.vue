<template>
  <div>
    <div>
      <select v-model="selectedCity" @change="changeCity()">
        <option v-for="city in cities" :value="city.name">
          {{ city.name }}
        </option>
      </select>
      <button @click="changeView()" v-if="view === 'list'">Grid</button>
      <button @click="changeView()" v-if="view === 'grid'">List</button>
    </div>
    <h1 style="margin-top:40px;">{{selectedCity}}</h1>
    <div style="margin-top:20px" v-if="view === 'list'">
      <div><span class="dateClass">Date</span><span class="dateClass">Temp</span></div>
      <div v-for="weatherObj in weather" style="margin-top:10px;"><span class="dateClass">{{weatherObj.dt_txt}}</span><span class="dateClass">{{weatherObj.main.temp}}&nbsp&#8451</span></div>
    </div>
    <div style="margin-top:20px" v-if="view === 'grid'">
      <div>
        <span style="display:inline-block;width:200px;border:1px solid black;">
          <ul style="list-style-type:none;padding-left:0">
            <li style="margin-bottom:30px;">Date</li>
            <li>Temp</li>
          </ul>
        </span>
        <span v-for="weatherObj in weather" style="display:inline-block;width:200px;border:1px solid black;">
          <ul style="list-style-type:none;padding-left:0;">
            <li style="margin-bottom:30px;">{{weatherObj.dt_txt}}</li>
            <li>{{weatherObj.main.temp}}&nbsp&#8451</li></ul></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Report',
    data () {
      return {
        cities: [],
        weather: [],
        selectedCity: '',
        view: 'list',
        computed: {
          ...mapState([
        'cities',
        'weather',
        'city'
      ])
    }
    }
    },
    mounted: function () {
      this.cities = this.$store.getters.cities
      this.selectedCity = this.$route.params.name || this.$store.getters.selectedCity;
      this.changeCity()
    },
    methods: {
      changeCity () {
        this.$store.dispatch('CHANGE_CITY', this.selectedCity).then(() => {
          this.weather = this.$store.getters.report.filter((item, index) => {
            if (index === 0 || index % 8 === 0) {
          return item
        }
      })
      })
      },
      changeView () {
        this.view = this.view === 'list' ? 'grid' : 'list'
      }
    }

  }
</script>
<style scoped>
  .dateClass {
    display:inline-block;
    width:300px;
    text-align:center;
  }
</style>

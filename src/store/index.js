/**
 * Created by Anusha on 20-Dec-17.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      cities: [],
      report: [],
      city: ''
    },
    actions: {
      ADD: function ({ commit }, city) {
        commit('ADD', city)
      },
      DELETE: function ({ commit }, city) {
        commit('DELETE', city)
      },
      CHANGE_CITY: function ({commit}, city) {
        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&appid=e95159b8f7ca9e1586485278fd3eea49'
        return axios.get(url).then((response) => {
            let weatherReport = response.data.list;
        commit('CHANGE_CITY', [city, weatherReport])
      })
      }
    },
    mutations: {
      ADD: (state, city) => {
      state.cities.push({name: city})
  },
  DELETE: (state, city) => {
  let updatedCities = []
  for (let i = 0; i < state.cities.length; i++) {
    if (state.cities[i].name !== city) {
      updatedCities.push({name: state.cities[i].name})
    }
  }
  state.cities = updatedCities;
},
CHANGE_CITY: (state, arr) => {
  state.report = arr[1]
  state.city = arr[0]
}
},
getters: {
  cities: state => {
    return state.cities
  },
  report: state => {
    return state.report
  },
  selectedCity: state => {
    return state.city
  }
}

})

export default store

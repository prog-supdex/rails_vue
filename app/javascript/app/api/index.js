import Vue from 'vue'
import axios from 'axios'

const adapter = axios.create({
  headers: {
    'Accept': 'application/json'
  }
})

const api = {
  staffs: {
    index: () => adapter.get('staffs')
  }
}

Vue.prototype.$api = api

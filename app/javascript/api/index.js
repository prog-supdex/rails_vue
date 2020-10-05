import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers.common['X-CSRF-Token'] =
  document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Vue.prototype.$api = axios

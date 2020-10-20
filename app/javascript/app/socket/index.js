import Vue from 'vue'
import ActionCableVue from 'actioncable-vue';
import ActionCable from 'actioncable'

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: 'ws://localhost:3000/cable',
  connectImmediately: true
});

console.log(ActionCable.getConfig('url'))

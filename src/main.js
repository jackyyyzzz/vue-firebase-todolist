import Vue from 'vue';
import App from './App.vue';
import store from './store';
import firebase from 'firebase';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyBr5jmHTMS8CLtBwZI-s0EDaQLDjv2H_W0',
  authDomain: 'vue-todolist-66160.firebaseapp.com',
  databaseURL: 'https://vue-todolist-66160.firebaseio.com',
  projectId: 'vue-todolist-66160',
  storageBucket: 'vue-todolist-66160.appspot.com',
  messagingSenderId: '340384632640',
  appId: '1:340384632640:web:f30e70574253dd8e7974a5',
});

export const db = firebase.firestore();

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
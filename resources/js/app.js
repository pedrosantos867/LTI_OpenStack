require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
import store from './stores/store'
import Vue from 'vue'
import Vuex from 'vuex'

import Home from './components/home'
import Login from './components/login'
import ExampleComponent from './components/ExampleComponent'

Vue.use(Vuex)
Vue.use(VueRouter)



//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const routes = [
    { path: '/login', component: Login },
    { path: '/', component: Home }   
]

const router = new VueRouter({
    //mode: 'history',
    routes
})

const app = new Vue({
    el: '#app',
    router, //==router:router
    store,
    data: {

    },
    methods: {

    },
    created() {
    }
});

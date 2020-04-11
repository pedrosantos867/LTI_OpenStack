require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
import store from './stores/store'
import Vue from 'vue'
import Vuex from 'vuex'

import Home from './components/home'
import Login from    './components/login'
import Logout from './components/logout'
import ProjectsList from './components/projectsList'
import ProjectDetails from './components/projectDetails'
import CreateInstance from './components/createInstance'
import EditInstance from './components/editInstance'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueToast);

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/projectsList', component: ProjectsList },   
    { path: '/projectDetails', component: ProjectDetails },
    { path: '/createInstance', component: CreateInstance },
    { path: '/editInstance', component: EditInstance },

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
        //this.$store.commit('loadTokenAndUserFromSession');
    }
});

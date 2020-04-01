import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        url: "http://134.122.49.176",
        token: "",
        user: null,
        userID: null,
        currentProjectName: "",
        currentProjectID: null,
        projectScopedToken: "",
        userPassword: null
    },
    mutations: {//synch
        
        //guardar token no Vuex e na session e adicionar o token aos headers do pedidos à API
        setToken: (state, token) => {
            state.token = token;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = token;
        },
        setProjectScopedToken: (state, token) => {
            state.projectScopedToken = token;
            sessionStorage.setItem('projectScopedToken', token);
        },
        clearToken: (state) => {
            state.token = "";
            sessionStorage.removeItem('token');
            axios.defaults.headers.common.Authorization = undefined;
        },
        setUser: (state, user) => {
            state.user = user;
            sessionStorage.setItem('user', user);
        },
        clearUser: (state) => {
            state.user = null;
            sessionStorage.removeItem('user');
        },
        clearUserAndToken: (state) => {
            state.user = null;
            state.token = "";
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            axios.defaults.headers.common.Authorization = undefined;
        },
        loadTokenAndUserFromSession: (state) => {
            state.token = "";
            state.user = null;
            let token = sessionStorage.getItem('token');
            let user = sessionStorage.getItem('user');
            if (token) {
                state.token = token;
                axios.defaults.headers.common.Authorization = "Bearer " + token;
            }
            if (user) {
                state.user = JSON.parse(user);
            }
        }

    },
    actions: {//async

    }
})

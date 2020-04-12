import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        url: "http://134.122.49.176", //Maquina Remota
        //url: "http://192.168.1.132",    //Máquina Pedro
        token: "",
        user: null,
        userID: null,
        currentProjectName: "",
        currentProjectID: null,
        projectScopedToken: "",
        userPassword: null,
        currentInstance: null
    },
    mutations: {//synch        
        setToken: (state, token) => {
            state.token = token;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common['X-Auth-Token'] = token;
        },
        setProjectScopedToken: (state, token) => {
            state.projectScopedToken = token;
            sessionStorage.setItem('projectScopedToken', token);
            axios.defaults.headers.common['X-Auth-Token'] = token;
        },
        clearProjectScopedToken: (state, token) => {
            state.projectScopedToken = "";
            sessionStorage.removeItem('projectScopedToken');
            axios.defaults.headers.common.Authorization = undefined;
        },
        setCurrentInstance: (state, id) => {
            state.currentInstance = id;
            sessionStorage.setItem('currentInstance', id);
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
            }
            if (user) {
                state.user = JSON.parse(user);
            }
        },
        setCurrentProjectID(state, id){
            state.currentProjectID = id
        },
        setCurrentProjectName(state, name){
            state.currentProjectName = name
        },
        setUserID(state, id){
            state.userID = id
        },
        setUserPassword(state, password){
            state.userPassword = password
        },
        
    },
    actions: {//async

    }
})

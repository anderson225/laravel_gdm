import axios from 'axios'
import mapActions from "vuex/dist/vuex.mjs";

const initialState = () => ({
    rayons: [],
    rayon: {},
    total: 0,
    current_page: 1
})

// state
const state = initialState();

// Getter functions
const getters = {
    GET_RAYONS() {
        return state.rayons
    },
    GET_RAYON() {
        return state.rayon
    },
    GET_TOTAL() {
        return state.total
    }
}


// Mutations
const mutations = {
    SET_RAYONS(state, data) {
        state.rayons = data;
    },
    SET_RAYON(state, data) {
        state.rayon = data;
    },
    SET_TOTAL(state, data) {
        state.total = data;
    },
    SET_CURRENTPAGE(state, data) {
        state.CURRENTPAGE = data;
    },
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    }
}

// Actions
const actions = {
    FETCH_RAYONS({commit}) {
        return new Promise((resolve, reject) => {
            axios.get("/api/auth/rayons").then((response) => {
                commit('RESET');
                commit('SET_RAYONS', response.data.rayons);
                commit('SET_TOTAL', response.data.total);
                resolve(response.data);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    FETCH_RAYON({commit}, params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/auth/rayon/" + params).then((response) => {
                commit('RESET');
                commit('SET_RAYON', response.data.rayon);
                resolve(response.data.rayon);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    SAVE_RAYON({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/rayon", data).then((response) => {
                commit('RESET');
                resolve(response.data);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    RESET_RAYON({commit}) {
        commit('RESET');
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

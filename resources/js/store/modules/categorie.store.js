import axios from 'axios'

const initialState = () => ({
    categories: [],
    categorie: {},
    total: 0,
    current_page: 1
})

// state
const state = initialState();

// Getter functions
const getters = {
    GET_CATEGORIES() {
        return state.categories
    },
    GET_CATEGORIE() {
        return state.categorie
    },
    GET_TOTAL() {
        return state.total
    }
}


// Mutations
const mutations = {
    SET_CATEGORIES(state, data) {
        state.categories = data;
    },
    SET_CATEGORIE(state, data) {
        state.categorie = data;
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
    FETCH_CATEGORIES({commit}) {
        return new Promise((resolve, reject) => {
            axios.get("/api/auth/categories").then((response) => {
                commit('RESET');
                commit('SET_CATEGORIES', response.data.categories);
                commit('SET_TOTAL', response.data.total);
                resolve(response.data);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    FETCH_CATEGORIE({commit}, params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/auth/categorie/" + params).then((response) => {
                commit('RESET');
                commit('SET_CATEGORIE', response.data.categorie);
                resolve(response.data.categorie);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    SAVE_CATEGORIE({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/categorie", data).then((response) => {
                commit('RESET');
                resolve(response.data);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    RESET_COMMANDES({commit}) {
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

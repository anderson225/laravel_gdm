import axios from 'axios'

const initialState = () => ({
    realisateurs: [],
    realisateur: {},
    total: 0,
    current_page: 1
})

// state
const state = initialState();

// Getter functions
const getters = {
    GET_REALISATEURS() {
        return state.rayons
    },
    GET_REALISATEUR() {
        return state.rayon
    },
    GET_TOTAL() {
        return state.total
    }
}


// Mutations
const mutations = {
    SET_REALISATEURS(state, data) {
        state.realisateurs = data;
    },
    SET_REALISATEUR(state, data) {
        state.realisateurs = data;
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
    FETCH_REALISATEURS({commit}) {
        return new Promise((resolve, reject) => {
            axios.get("/api/auth/realisateurs").then((response) => {
                commit('RESET');
                commit('SET_REALISATEURS', response.data.realisateurs);
                commit('SET_TOTAL', response.data.total);
                resolve(response.data);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    RESET_REALISATEUR({commit}) {
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

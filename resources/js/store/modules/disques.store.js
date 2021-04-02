import axios from 'axios'

const initialState = () => ({
    disques: [],
    disque: {},
    total: 0,
    current_page: 1
})

// state
const state = initialState();

// Getter functions
const getters = {
    GET_DISQUES() {
        return state.disques
    },
    GET_DISQUE() {
        return state.disque
    },
    GET_TOTAL() {
        return state.total
    }
}


// Mutations
const mutations = {
    SET_DISQUES(state, data) {
        state.disques = data;
    },
    SET_DISQUE(state, data) {
        state.disque = data;
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
    FETCH_DISQUES({commit}) {
        return new Promise((resolve, reject) => {
            axios.get("/api/auth/disques").then((response) => {
                commit('RESET');
                commit('SET_DISQUES', response.data.disques);
                commit('SET_TOTAL', response.data.total);
                resolve(response.data);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    FETCH_DISQUE({commit}, params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/auth/disque/" + params).then((response) => {
                commit('RESET');
                commit('SET_DISQUE', response.data.disque);
                resolve(response.data.disque);
            }).catch((err) => {
                reject(err)
            });
        });
    },
    RESET_DISQUE({commit}) {
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

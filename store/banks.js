export const state = () => ({
    banks: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_BANKS(state, payload) {
        state.banks = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, query) {
        const { data: { data: banks, pagination } } = await this.$api.banks.getAll(query);

        commit('SET_BANKS', banks);
        commit('SET_PAGINATION', pagination);
    },
};

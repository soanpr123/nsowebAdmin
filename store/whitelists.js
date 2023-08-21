export const state = () => ({
    whitelists: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_WHITELISTS(state, payload) {
        state.whitelists = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, query) {
        const { data: { data: whitelists, pagination } } = await this.$api.whitelists.getAll(query);

        commit('SET_WHITELISTS', whitelists);
        commit('SET_PAGINATION', pagination || {});
    },
};

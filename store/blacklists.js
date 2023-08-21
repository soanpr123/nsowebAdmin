export const state = () => ({
    blacklists: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_BLACKLISTS(state, payload) {
        state.blacklists = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, query) {
        const { data: { data: blacklists, pagination } } = await this.$api.blacklists.getAll(query);

        commit('SET_BLACKLISTS', blacklists);
        commit('SET_PAGINATION', pagination);
    },
};

export const state = () => ({
    smsErrors: [],
    pagination: {},
});

export const mutations = {
    SET_SMS_ERRORS(state, payload) {
        state.smsErrors = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, query) {
        const { data: { data, pagination } } = await this.$api.smsErrors.getAll(query);

        commit('SET_SMS_ERRORS', data);
        commit('SET_PAGINATION', pagination);
    },
};

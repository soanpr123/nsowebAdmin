export const state = () => ({
    bankAccounts: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_BANK_ACCOUNTS(state, payload) {
        state.bankAccounts = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, query) {
        commit('SET_BANK_ACCOUNTS', []);
        const { data: { data: bankAccounts, pagination } } = await this.$api.bankAccounts.getAll({
            status: 'all',
            ...query,
        });

        commit('SET_BANK_ACCOUNTS', bankAccounts?.sort((a, b) => (+b.BankInfo?.order || 0) - (+a.BankInfo?.order || 0)));
        commit('SET_PAGINATION', pagination);
    },
};

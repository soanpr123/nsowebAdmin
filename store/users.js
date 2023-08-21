import { mapDataFromOptions } from '@/utils/data';
import { USER_STATUS_OPTIONS } from '@/constants/user/status';

export const state = () => ({
    users: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_USERS(state, payload) {
        state.users = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, query) {
        const { data: { data, pagination } } = await this.$api.users.getAll(query);
        const STATUS_OPTIONS = mapDataFromOptions(USER_STATUS_OPTIONS);
        const users = data?.map?.((user) => ({
            ...user,
            statusData: STATUS_OPTIONS[user.status],
        }));

        commit('SET_USERS', users);
        commit('SET_PAGINATION', pagination);
    },
};

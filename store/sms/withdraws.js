import { mapDataFromOptions } from '@/utils/data';
import { SMS_WITHDRAW_STATUS_OPTIONS } from '@/constants/sms/withdraw/status';

export const state = () => ({
    smsWithdraws: [],
    summary: {},
    pagination: {},
});

export const mutations = {
    SET_SMS_WITHDRAWS(state, payload) {
        state.smsWithdraws = payload;
    },

    SET_SUMMARY(state, payload) {
        state.summary = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, query) {
        const {
            data: {
                data, pagination, sumSuccess, sumPendding,
            },
        } = await this.$api.smsWithdraws.getAll(query);

        const STATUS_OPTIONS = mapDataFromOptions(SMS_WITHDRAW_STATUS_OPTIONS);
        const smsWithdraws = data?.map?.((smsWithdraw) => ({
            ...smsWithdraw,
            status: STATUS_OPTIONS[smsWithdraw.status] || {},
        }));

        commit('SET_SMS_WITHDRAWS', smsWithdraws);
        commit('SET_PAGINATION', pagination);
        commit('SET_SUMMARY', {
            sumSuccess,
            sumPendding,
        });
    },
};

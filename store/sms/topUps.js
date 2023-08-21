import { mapDataFromOptions } from '@/utils/data';
import { SMS_TOP_UP_STATUS_OPTIONS } from '@/constants/sms/topUp/status';

export const state = () => ({
    smsTopUps: [],
    summary: {},
    pagination: {},
});

export const mutations = {
    SET_SMS_TOP_UPS(state, payload) {
        state.smsTopUps = payload;
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
        } = await this.$api.smsTopUps.getAll(query);

        const STATUS_OPTIONS = mapDataFromOptions(SMS_TOP_UP_STATUS_OPTIONS);
        const smsTopUps = data?.map?.((smsTopUp) => ({
            ...smsTopUp,
            status: STATUS_OPTIONS[smsTopUp.status] || {},
        }));

        commit('SET_SMS_TOP_UPS', smsTopUps);
        commit('SET_PAGINATION', pagination);
        commit('SET_SUMMARY', {
            sumSuccess,
            sumPendding,
        });
    },
};

import { mapDataFromOptions } from '@/utils/data';
import { WITHDRAW_STATUS_OPTIONS } from '@/constants/withdraw/status';
import { WITHDRAW_TRANSFER_STATUS_OPTIONS } from '@/constants/withdraw/transferStatus';

export const state = () => ({
    withdraws: [],
    summary: {},
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_WITHDRAWS(state, payload) {
        state.withdraws = payload;
    },

    SET_SUMMARY(state, payload) {
        state.summary = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit, dispatch }, query) {
        const {
            data: {
                data,
                pagination,
                countError,
                countPendding,
                countSuccess,
                countTransferSuccess,
                countTransferError,
                sumError,
                sumPendding,
                sumSuccess,
                sumTransferSuccess,
                sumTransferError,
            },
        } = await this.$api.withdraws.getAll(query);
        if (query.partnerReference) {
            await dispatch('partnerReferences/fetchDetail', {
                partnerReference: query.partnerReference,
            }, { root: true });
        } else {
            commit('partnerReferences/SET_PARTNER_REFERENCE', null, { root: true });
        }
        const STATUS_OPTIONS = mapDataFromOptions(WITHDRAW_STATUS_OPTIONS);
        const TRANSFER_STATUS_OPTIONS = mapDataFromOptions(WITHDRAW_TRANSFER_STATUS_OPTIONS);
        const withdraws = data?.map?.((_withdraw) => ({
            ..._withdraw,
            status: STATUS_OPTIONS[_withdraw.status],
            transferStatus: TRANSFER_STATUS_OPTIONS[_withdraw.statusTransfer],
        }));

        commit('SET_WITHDRAWS', withdraws);
        commit('SET_PAGINATION', pagination);
        commit('SET_SUMMARY', {
            countError,
            countPendding,
            countSuccess,
            countTransferSuccess,
            countTransferError,
            sumError,
            sumPendding,
            sumSuccess,
            sumTransferSuccess,
            sumTransferError,
        });
    },
};

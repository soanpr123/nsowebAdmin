<template>
    <div>
        <a-table
            :data-source="withdraws"
            :loading="loading"
            :scroll="{ x: 800 }"
            :pagination="false"
            @change="(pagination, filters, sorter) => handleChange(sorter)"
        >
            <a-table-column
                v-if="pagination"
                key="index"
                title="STT"
                :width="60"
                :custom-render="getIndex"
            />
            <a-table-column
                key="Bank"
                title="BANK"
                data-index="Bank"
                :width="60"
            >
                <template #default="bank">
                    <span :title="bank.bankName">{{ bank.bankCode }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="bankAccName"
                title="CHỦ TK"
                data-index="bankAccName"
                :width="140"
            >
                <template #default="bankAccName">
                    <a-tooltip placement="top" :title="bankAccName">
                        <div class="flex !max-w-[140px]">
                            <span
                                class="overflow-hidden whitespace-nowrap"
                                :title="bankAccName"
                                style="direction: rtl; text-overflow: ellipsis"
                            >
                                {{ bankAccName }}
                            </span>
                        </div>
                    </a-tooltip>
                </template>
            </a-table-column>
            <a-table-column
                key="bankAccNumber"
                title="SỐ TK"
                data-index="bankAccNumber"
                :width="160"
            />
            <a-table-column
                key="transferAmount"
                title="SỐ TIỀN"
                align="right"
                data-index="transferAmount"
                :sorter="true"
                :width="110"
            >
                <template #default="transferAmount">
                    {{ transferAmount | currencyFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="partnerReference"
                title="NICKNAME"
                class="!text-prim-90"
                data-index="partnerReference"
                :sorter="true"
                :width="120"
            >
                <template #default="partnerReference">
                    <span class="underline cursor-pointer" @click="handleFilter('partnerReference', partnerReference)">{{ partnerReference }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="DUYỆT"
                align="center"
                :width="90"
            >
                <template #default="record">
                    <a-tooltip v-if="record.status && record.status.color" placement="top" :title="record.status.value === WITHDRAW_STATUS.CANCELED ? record.note : null">
                        <a-tag
                            :color="record.status.color"
                            class="!px-2 !py-0.5 !cursor-pointer !select-none"
                            @click="handleFilter('status', record.status.value)"
                        >
                            {{ record.status.label }}
                        </a-tag>
                    </a-tooltip>
                </template>
            </a-table-column>
            <a-table-column
                key="transferStatus"
                title="CHUYỂN"
                align="center"
                data-index="transferStatus"
                :width="110"
            >
                <template #default="transferStatus">
                    <a-tag
                        v-if="transferStatus && transferStatus.color"
                        :color="transferStatus.color"
                        class="!px-2 !py-0.5 !cursor-pointer !select-none"
                        @click="handleFilter('statusTransfer', transferStatus.value)"
                    >
                        <span v-html="transferStatus.htmlLabel" />
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                title="TIME TẠO"
                align="center"
                data-index="createdAt"
                :sorter="true"
                :width="125"
            >
                <template #default="createdAt">
                    <div>{{ createdAt | dateFormat }} {{ createdAt | dateFormat('HH:mm') }}</div>
                </template>
            </a-table-column>
            <!-- <a-table-column
                key="updatedAt"
                title="TIME XỬ LÝ"
                align="center"
                data-index="updatedAt"
                :width="125"
            >
                <template #default="updatedAt">
                    <div>{{ updatedAt | dateFormat }} {{ updatedAt | dateFormat('HH:mm') }}</div>
                </template>
            </a-table-column> -->
            <a-table-column
                key="timespan"
                title="TIMESPAN"
                align="right"
                :width="90"
            >
                <template #default="record">
                    <a-tooltip placement="top" :title="dateFormat(record.updatedAt, 'dd/MM/yyyy HH:mm')">
                        {{ getProcessTime(record) / 1000 | humanizeTimeRange }}
                    </a-tooltip>
                </template>
            </a-table-column>
            <a-table-column
                key="Admin"
                title="THỰC HIỆN"
                align="center"
                data-index="Admin.username"
                :width="120"
            >
                <template #default="username">
                    {{ username || 'đối tác' }}
                </template>
            </a-table-column>
            <!-- <a-table-column
            key="note"
            title="GHI CHÚ"
            data-index="note"
            :width="120"
        >
            <template #default="note">
                {{ note || '-' }}
            </template>
        </a-table-column> -->
            <a-table-column
                key="transferId"
                title="MÃ GD"
                data-index="transferId"
                :width="120"
            >
                <template #default="transferId">
                    <div v-if="transferId" class="flex items-center gap-1 max-w-[120px]">
                        <i class="far fa-copy text-prim-90 cursor-pointer" @click="copyText(transferId)" />
                        <span
                            class="overflow-hidden whitespace-nowrap"
                            :title="transferId"
                            style="direction: rtl; text-overflow: ellipsis"
                        >
                            {{ transferId }}
                        </span>
                    </div>
                </template>
            </a-table-column>
            <a-table-column
                key="actions"
                align="left"
                title="HÀNH ĐỘNG"
                :width="170"
                :fixed="isMobile ? false : 'right'"
            >
                <template #default="withdraw">
                    <a-tooltip placement="top" title="Logs">
                        <a-button
                            type="primary"
                            class="mr-1 !font-normal"
                            size="small"
                            @click="$refs.withdrawLogsDialog.open(withdraw)"
                        >
                            <i class="far fa-file-alt" />
                        </a-button>
                    </a-tooltip>
                    <a-button
                        v-if="_get(withdraw, 'status.value') === WITHDRAW_STATUS.PENDING"
                        type="primary"
                        class="mr-1 !font-normal"
                        size="small"
                        @click="$refs.withdrawApproveDialog.open(withdraw)"
                    >
                        Duyệt
                    </a-button>
                    <a-button
                        v-if="_get(withdraw, 'status.value') === WITHDRAW_STATUS.SUCCESS && _get(withdraw, 'transferStatus.value') === WITHDRAW_TRANSFER_STATUS.ERROR"
                        type="primary"
                        class="mr-1 !font-normal"
                        size="small"
                        @click="setStatus(withdraw, WITHDRAW_STATUS.SUCCESS)"
                    >
                        Chuyển
                    </a-button>
                    <a-button
                        v-if="
                            _get(withdraw, 'status.value') === WITHDRAW_STATUS.PENDING
                                || (_get(withdraw, 'status.value') === WITHDRAW_STATUS.SUCCESS && _get(withdraw, 'transferStatus.value') === WITHDRAW_TRANSFER_STATUS.ERROR)"
                        type="danger"
                        ghost
                        class="!font-normal"
                        size="small"
                        @click="$refs.withdrawCancelDialog.open(withdraw)"
                    >
                        Hủy
                    </a-button>
                </template>
            </a-table-column>
        </a-table>
        <WithdrawLogsDialog ref="withdrawLogsDialog" />
        <WithdrawApproveDialog ref="withdrawApproveDialog" />
        <WithdrawCancelDialog ref="withdrawCancelDialog" />
    </div>
</template>

<script>
    import _get from 'lodash/get';
    import { mapState } from 'vuex';
    import dateFormat from '@/plugins/filters/dateFormat';
    import { WITHDRAW_STATUS } from '@/constants/withdraw/status';
    import { WITHDRAW_TRANSFER_STATUS } from '@/constants/withdraw/transferStatus';
    import WithdrawApproveDialog from '@/components/withdraws/dialogs/Approve.vue';
    import WithdrawCancelDialog from '@/components/withdraws/dialogs/Cancel.vue';
    import WithdrawLogsDialog from '@/components/withdraws/dialogs/Logs.vue';

    export default {
        components: {
            WithdrawLogsDialog,
            WithdrawApproveDialog,
            WithdrawCancelDialog,
        },

        props: {
            withdraws: {
                type: Array,
                required: true,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: {
                type: Object,
                required: false,
            },
        },

        data() {
            return {
                WITHDRAW_STATUS,
                WITHDRAW_TRANSFER_STATUS,
            };
        },

        computed: {
            ...mapState(['isMobile']),
        },

        methods: {
            _get,
            dateFormat,

            getIndex(text, record, index) {
                return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
            },

            getProcessTime(withdraw) {
                return (new Date(withdraw.updatedAt)).getTime() - (new Date(withdraw.createdAt).getTime());
            },

            handleFilter(key, value) {
                this.$router.push({
                    query: {
                        ...this.$route.query,
                        [key]: value,
                        page: 1,
                    },
                });
            },

            async setStatus(withdraw, status) {
                try {
                    await this.$api.withdraws.update(withdraw.id, {
                        status,
                    });
                    this.$message.success('Cập nhật trạng thái thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                }
            },

            handleChange(sorter) {
                const query = {
                    ...this.$route.query,
                    orderBy: sorter.order ? sorter.columnKey : undefined,
                };
                switch (sorter.order) {
                    case 'ascend':
                        query.sort = 'ASC';
                        break;
                    case 'descend':
                        query.sort = 'DESC';
                        break;
                    default:
                        query.sort = undefined;
                }
                this.$router.push({
                    path: this.$route.path,
                    query,
                });
            },

            copyText(text) {
                try {
                    const input = document.createElement('input');
                    input.setAttribute('value', text);
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                    this.$message.success('Đã sao chép!');
                } catch (error) {
                    this.$handleError(error, this.$message);
                }
            },
        },
    };
</script>

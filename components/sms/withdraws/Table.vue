<template>
    <a-table
        :data-source="messages"
        :loading="loading"
        :scroll="{ x: 800 }"
        :pagination="false"
    >
        <a-table-column
            v-if="pagination"
            key="index"
            title="STT"
            :width="60"
            :custom-render="getIndex"
        />
        <a-table-column
            key="id"
            title="MÃ TIN"
            data-index="id"
            :width="100"
        />
        <a-table-column
            key="Bank"
            title="NGÂN HÀNG"
            data-index="Bank.bankName"
            :width="130"
        />
        <a-table-column
            key="content"
            title="NỘI DUNG TIN NHẮN TỪ NGÂN HÀNG"
            data-index="content"
            :width="300"
        />
        <a-table-column
            key="transferAmount"
            title="TIỀN RÚT"
            data-index="transferAmount"
            class="!text-red-100"
            align="right"
            :width="120"
        >
            <template #default="transferAmount">
                {{ transferAmount | currencyFormat }}
            </template>
        </a-table-column>
        <a-table-column
            key="partnerReference"
            title="NỘI DUNG"
            data-index="partnerReference"
            :width="130"
        />
        <!-- <a-table-column
            key="status"
            title="TRẠNG THÁI"
            align="center"
            data-index="status"
            :width="100"
        >
            <template #default="status">
                <a-tag v-if="status && status.color" :color="status.color">
                    {{ status.label }}
                </a-tag>
            </template>
        </a-table-column> -->
        <a-table-column
            key="transferId"
            title="MÃ GD"
            data-index="transferId"
            :width="130"
        >
            <template #default="transferId">
                <span v-if="transferId" class="flex items-center gap-1 max-w-[130px]" :title="transferId">
                    <i class="far fa-copy text-prim-90 cursor-pointer" @click="copyText(transferId)" />
                    <span
                        class="overflow-hidden whitespace-nowrap"
                        :title="transferId"
                        style="direction: rtl; text-overflow: ellipsis"
                    >
                        {{ transferId }}
                    </span>
                </span>
            </template>
        </a-table-column>
        <a-table-column
            key="createdAt"
            title="TIME NHẬN SMS"
            data-index="createdAt"
            :width="130"
        >
            <template #default="createdAt">
                <div>{{ createdAt | dateFormat }} {{ createdAt | dateFormat('HH:mm') }}</div>
            </template>
        </a-table-column>
        <!-- <a-table-column
            key="actions"
            align="center"
            title="HÀNH ĐỘNG"
            :width="120"
        >
            <template #default="message">
                <a-button
                    v-if="_get(message, 'status.value') !== SMS_WITHDRAW_STATUS.SUCCESS"
                    type="primary"
                    class="mr-2"
                    @click="mappingMessage(message)"
                >
                    <i class="fas fa-redo-alt mr-2" /> Map lại
                </a-button>
            </template>
        </a-table-column> -->
    </a-table>
</template>

<script>
    import _get from 'lodash/get';
    import { SMS_WITHDRAW_STATUS } from '@/constants/sms/withdraw/status';

    export default {
        props: {
            messages: {
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
                SMS_WITHDRAW_STATUS,
            };
        },

        methods: {
            _get,

            getIndex(text, record, index) {
                return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
            },

            async mappingMessage(message) {
                try {
                    await this.$api.smsWithdraws.mapping(message.id);
                    this.$message.success('Map lại thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                }
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

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
            key="transferMessage"
            title="NỘI DUNG TIN"
            data-index="transferMessage"
            :width="330"
        />
        <a-table-column
            v-if="$route.query.type !== 'orther'"
            key="bank"
            title="NGÂN HÀNG"
            data-index="bank"
            :width="100"
        />
        <a-table-column
            v-if="$route.query.type !== 'orther'"
            key="amount"
            title="SỐ TIỀN"
            data-index="amount"
            :width="100"
        />
        <a-table-column
            v-if="$route.query.type !== 'orther'"
            key="balance"
            title="SỐ DƯ"
            data-index="balance"
            :width="100"
        />
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
                    v-if="_get(message, 'status.value') !== SMS_TOP_UP_STATUS.SUCCESS"
                    type="primary"
                    size="small"
                    @click="mappingMessage(message)"
                >
                    Map lại
                </a-button>
            </template>
        </a-table-column> -->
    </a-table>
</template>

<script>
    import _get from 'lodash/get';

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

        methods: {
            _get,

            getIndex(text, record, index) {
                return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
            },

            async mappingMessage(message) {
                try {
                    await this.$api.smsTopUps.mapping(message.id);
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

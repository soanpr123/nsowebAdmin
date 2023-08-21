<template>
    <a-table
        :data-source="data"
        :loading="loading"
        bordered
        :pagination="false"
    >
        <a-table-column
            key="hour"
            title="STT"
            :width="40"
            :custom-render="(text, record, index) => index + 1"
        />
        <a-table-column
            key="partnerReference"
            title="User"
            data-index="partnerReference"
            :width="140"
            align="left"
        >
            <template #default="partnerReference">
                <nuxt-link :to="`${prefixRedirect}?partnerReference=${partnerReference}&fromDate=${$route.query.fromDate}&toDate=${$route.query.toDate}`" class="!text-prim-90 hover:underline">
                    {{ partnerReference }}
                </nuxt-link>
            </template>
        </a-table-column>
        <a-table-column
            key="count_request"
            title="Số lượt"
            data-index="count_request"
            :width="85"
            align="right"
        >
            <template #default="withdrawCount">
                {{ withdrawCount | numberFormat }}
            </template>
        </a-table-column>
        <a-table-column
            key="sum_ammount"
            title="Tổng tiền"
            data-index="sum_ammount"
            :width="110"
            align="right"
        >
            <template #default="momoIn">
                {{ momoIn | currencyFormat }}
            </template>
        </a-table-column>
    </a-table>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            prefixRedirect: {
                type: String,
                default: '/',
            },
        },
    };
</script>

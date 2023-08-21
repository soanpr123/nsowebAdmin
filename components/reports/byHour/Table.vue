<template>
    <a-table
        :data-source="reports"
        :loading="loading"
        bordered
        :pagination="false"
    >
        <a-table-column
            key="hour"
            title="Giờ"
            :width="50"
            data-index="hour"
        >
            <template #default="hour">
                <span :class="{'font-semibold': hour === 'Tổng'}">{{ hour }}</span>
            </template>
        </a-table-column>
        <a-table-column
            key="topUpCount"
            title="Bank In"
            :width="100"
            align="right"
        >
            <template slot="default" slot-scope="record,rules,index">
                <span :class="{'text-green-100 font-semibold': index === reports.length - 1}">{{ record.topUpSum | currencyFormat }}</span>
            </template>
        </a-table-column>
        <a-table-column
            key="withdrawCount"
            title="Bank out"
            :width="100"
            align="right"
        >
            <template slot="default" slot-scope="record,rules,index">
                <span :class="{'text-yellow-100 font-semibold': index === reports.length - 1}">{{ record.withdrawSum | currencyFormat }}</span>
            </template>
        </a-table-column>
        <a-table-column
            key="momoIn"
            title="Momo In"
            :width="100"
            align="right"
        >
            <template slot="default" slot-scope="record,rules,index">
                <span :class="{'text-green-100 font-semibold': index === reports.length - 1}">{{ record.momoIn | currencyFormat }}</span>
            </template>
        </a-table-column>
        <a-table-column
            key="momoOut"
            title="Momo Out"
            :width="100"
            align="right"
        >
            <template slot="default" slot-scope="record,rules,index">
                <span :class="{'text-yellow-100 font-semibold': index === reports.length - 1}">{{ record.momoOut | currencyFormat }}</span>
            </template>
        </a-table-column>
    </a-table>
</template>

<script>
    import _get from 'lodash/get';

    export default {
        props: {
            reports: {
                type: Array,
                required: true,
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            _get,
        },
    };
</script>

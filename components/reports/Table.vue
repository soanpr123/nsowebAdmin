<template>
    <a-table
        :data-source="props"
        bordered
        :loading="loading"
        :pagination="false"
    >
        <a-table-column
            key="index"
            title="STT"
            :width="60"
            :custom-render="getIndex"
        />
        <a-table-column
            key="title"
            title="Hình thức"
            align="center"
            :width="130"
            :custom-render="renderTitle"
        />
        <a-table-column
            key="type"
            title="Loại"
            :width="60"
            :custom-render="renderType"
        />
        <a-table-column
            key="summary"
            title="TH"
            :width="60"
            :custom-render="renderSummary"
        />
        <a-table-column
            v-for="date in dates"
            :key="date"
            :title="getTitle(date)"
            :width="90"
            align="right"
            :custom-render="(text, record, index) => renderValue(index, date)"
        />
    </a-table>
</template>

<script>
    import currencyFormat from '@/plugins/filters/currencyFormat';
    import dateFormat from '@/plugins/filters/dateFormat';

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
            pagination: {
                type: Object,
                required: false,
            },
        },

        data() {
            return {
                props: [
                    'topUp_bank_count', 'topUp_bank_user', 'topUp_bank_amount',
                    'topUp_momo_count', 'topUp_momo_user', 'topUp_momo_amount',
                    'withdraw_bank_count', 'withdraw_bank_user', 'withdraw_bank_amount',
                    'diff',
                ],
            };
        },

        computed: {
            dates() {
                return this.reports.map((report) => report.date.getTime());
            },

            data() {
                const data = this.props.map(() => ({}));
                this.reports.forEach((report) => {
                    this.props.forEach((prop, index) => {
                        data[index][report.date.getTime()] = report[prop];
                    });
                });

                return data;
            },
        },

        methods: {
            getIndex(text, record, index) {
                return index + 1;
            },

            renderTitle(text, record, index) {
                let title = '';
                switch (index) {
                    case 0:
                        title = 'NẠP';
                        break;
                    case 2:
                        title = 'RÚT';
                        break;
                    case 4:
                        title = 'NAP -  RÚT';
                        break;
                    default:
                        title = '';
                }

                return {
                    children: title,
                    attrs: {
                        // eslint-disable-next-line no-nested-ternary
                        rowSpan: index === 0 || index === 2 ? 2 : ([1, 2].includes(index) ? 0 : 1),
                        colSpan: 1,
                    },
                };
            },

            renderType(text, record, index) {
                let type = '';
                switch (index) {
                    case 0:
                        type = 'Bank';
                        break;
                    case 1:
                        type = 'Momo';
                        break;
                    case 2:
                        type = 'Bank';
                        break;
                    default:
                        type = '';
                }

                return {
                    children: type,
                    attrs: {
                        rowSpan: 3,
                        colSpan: 1,
                    },
                };
            },

            renderSummary(text, record, index) {
                if (index % 3 === 0) {
                    return 'Số lệnh';
                }

                if (index % 3 === 1) {
                    return 'Số người';
                }

                return 'Số tiền';
            },

            renderValue(index, date) {
                return currencyFormat(this.data[index][date]);
            },

            getTitle(date) {
                return dateFormat(new Date(date));
            },
        },
    };
</script>

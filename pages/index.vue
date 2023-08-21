<template>
    <div class="bg-transparent !shadow-none !p-0">
        <ReportFilter class="bg-white shadow-light p-4" />
        <a-spin :spinning="loading" class="mt-4 bg-white shadow-light p-4 overflow-auto">
            <SummaryTable
                :reports="reports"
                :summary="summary"
            />
        </a-spin>
    </div>
</template>

<script>
    import _clondeDeep from 'lodash/cloneDeep';
    import { mapState } from 'vuex';
    import moment from 'moment';
    import ReportFilter from '@/components/reports/Filter.vue';
    import SummaryTable from '@/components/dashboard/SummaryTable.vue';

    export default {
        components: {
            ReportFilter,
            SummaryTable,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ query, redirect }) {
            if (!query.fromDate || !query.toDate) {
                redirect('/', {
                    fromDate: moment().subtract(9, 'days').startOf('day').format('x'),
                    toDate: moment().endOf('day').format('x'),
                });
            }
        },

        data() {
            return {
                loading: false,
                reports: [],
                summary: {},
                fetchInterval: null,
            };
        },

        computed: {
            ...mapState(['autoFetch']),
        },

        watch: {
            '$route.query': {
                async handler(query, oldQuery) {
                    const limitDays = 31;
                    const limit = 1000 * 60 * 60 * 24 * limitDays;
                    if ((new Date(query.toDate).getTime()) - (new Date(query.fromDate).getTime()) > limit) {
                        this.$router.push({
                            path: this.$route.path,
                            query: {
                                toDate: oldQuery.toDate,
                                fromDate: oldQuery.fromDate,
                            },
                        });
                        this.$message.warning(`Tối đa được lọc trong khoảng ${limitDays} ngày`);
                    } else {
                        await this.fetchData();
                    }
                },
            },
        },

        mounted() {
            this.fetchInterval = setInterval(() => {
                this.syncData();
            }, 3000);
        },

        beforeDestroy() {
            clearInterval(this.fetchInterval);
        },

        methods: {
            async syncData() {
                if (this.autoFetch && document.visibilityState === 'visible') {
                    await this.fetchData({ loading: false });
                }
            },

            async fetchData(options = {}) {
                try {
                    if (options.loading !== false) {
                        this.loading = true;
                    }
                    const defaultReport = {
                        countNickNameTopup: 0,
                        countNickNameWithdraw: 0,
                        countRequestTopup: 0,
                        countRequestWithdraw: 0,
                        totalTopup: 0,
                        totalWithdraw: 0,
                    };
                    const { data: { data: reports } } = await this.$api.dashboard.getSummary(this.$route.query);
                    this.summary = reports.reduce((summary, report) => {
                        summary.countNickNameTopup += +report.countNickNameTopup;
                        summary.countNickNameWithdraw += +report.countNickNameWithdraw;
                        summary.countRequestTopup += +report.countRequestTopup;
                        summary.countRequestWithdraw += +report.countRequestWithdraw;
                        summary.totalTopup += +report.totalTopup;
                        summary.totalWithdraw += +report.totalWithdraw;

                        return summary;
                    }, {
                        countNickNameTopup: 0,
                        countNickNameWithdraw: 0,
                        countRequestTopup: 0,
                        countRequestWithdraw: 0,
                        totalTopup: 0,
                        totalWithdraw: 0,
                    });

                    const filteredDates = [];
                    const currentDate = new Date(this.$route.query.fromDate);
                    const toDate = new Date(this.$route.query.toDate);
                    while (currentDate <= toDate) {
                        filteredDates.push(_clondeDeep(currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                    }

                    const data = {};
                    filteredDates.forEach((filteredDate) => {
                        data[filteredDate.getTime()] = {
                            ...defaultReport,
                            createdAt: filteredDate,
                        };
                    });

                    reports.forEach((report) => {
                        const reportDate = new Date(report.createdAt);
                        reportDate.setHours(0, 0, 0, 0);
                        data[reportDate.getTime()] = report;
                    });

                    this.reports = Object.values(data).sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime());
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Dashboard',
            };
        },
    };
</script>

<template>
    <div class="bg-transparent !shadow-none !p-0">
        <ReportFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4 grid grid-cols-1 2xl:grid-cols-12 gap-4">
            <div class="col-span-1 2xl:col-span-5">
                <div class="text-xl font-semibold text-prim-100">
                    Thống kê theo giờ
                </div>
                <ReportByHourTable
                    :reports="reportByHours"
                    :loading="reportByHourLoading"
                    class="mt-4"
                />
            </div>
            <div class="grid grid-cols-1 2xl:grid-cols-2 gap-4 col-span-1 2xl:col-span-7">
                <div>
                    <div class="text-xl font-semibold text-prim-100">
                        Top nạp bank
                    </div>
                    <ReportLeaderBoardTable
                        class="mt-4"
                        :loading="leaderboardLoading"
                        :data="leaderboard.countTopup || []"
                        prefix-redirect="/top-ups"
                    />
                </div>
                <div>
                    <div class="text-xl font-semibold text-prim-100">
                        Top rút bank
                    </div>
                    <ReportLeaderBoardTable
                        class="mt-4"
                        :loading="leaderboardLoading"
                        :data="leaderboard.countWithdraw || []"
                        prefix-redirect="/withdraws"
                    />
                </div>
                <div>
                    <div class="text-xl font-semibold text-prim-100">
                        Top nạp momo
                    </div>
                    <ReportLeaderBoardTable
                        class="mt-4"
                        :loading="leaderboardLoading"
                        :data="[]"
                        prefix-redirect="/"
                    />
                </div>
                <div>
                    <div class="text-xl font-semibold text-prim-100">
                        Top rút momo
                    </div>
                    <ReportLeaderBoardTable
                        class="mt-4"
                        :loading="leaderboardLoading"
                        :data="[]"
                        prefix-redirect="/"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import _cloneDeep from 'lodash/cloneDeep';
    import { mapState } from 'vuex';
    import ReportFilter from '@/components/reports/Filter.vue';
    import ReportByHourTable from '@/components/reports/byHour/Table.vue';
    import ReportLeaderBoardTable from '@/components/reports/leaderBoard/Table.vue';

    export default {
        components: {
            ReportFilter,
            ReportByHourTable,
            ReportLeaderBoardTable,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ query, redirect }) {
            if (!query.fromDate || !query.toDate) {
                redirect('/reports', {
                    fromDate: moment().startOf('day').format('x'),
                    toDate: moment().endOf('day').format('x'),
                });
            }
        },

        data() {
            const defaultReportByHours = [];

            for (let index = 0; index < 24; index += 1) {
                defaultReportByHours.push({
                    hour: index,
                    withdrawCount: 0,
                    topUpCount: 0,
                });
            }
            defaultReportByHours.push({
                hour: 'Tổng',
                topUpCount: 0,
                topUpSum: 0,
                withdrawCount: 0,
                withdrawSum: 0,
            });

            return {
                reportByHourLoading: false,
                leaderboardLoading: false,
                reportByHours: _cloneDeep(defaultReportByHours),
                defaultReportByHours,
                leaderboard: {},
                fetchInterval: null,
            };
        },

        computed: {
            ...mapState(['autoFetch']),
        },

        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
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
                this.fetchByHours(options);
                this.fetchLeaderboard(options);
            },

            async fetchByHours(options = {}) {
                try {
                    if (options.loading !== false) {
                        this.reportByHourLoading = true;
                    }
                    const { data } = await this.$api.reports.getByHours(this.$route.query);
                    data.countTopup?.forEach?.((topUp) => {
                        if (topUp.hourUpdatedAt !== null) {
                            const hour = Number(`${topUp.hourUpdatedAt}`.slice(-2));
                            this.reportByHours[hour].topUpCount = +topUp.count_request;
                            this.reportByHours[hour].topUpSum = +topUp.sum_amount;
                        }
                    });
                    data.countWithdraw?.forEach?.((withdraw) => {
                        if (withdraw.hourUpdatedAt !== null) {
                            const hour = Number(`${withdraw.hourUpdatedAt}`.slice(-2));
                            this.reportByHours[hour].withdrawCount = +withdraw.count_request;
                            this.reportByHours[hour].withdrawSum = +withdraw.sum_amount;
                        }
                    });

                    // Sum total
                    this.reportByHours[24] = {
                        hour: 'Tổng',
                        topUpCount: 0,
                        topUpSum: 0,
                        withdrawCount: 0,
                        withdrawSum: 0,
                    };
                    this.reportByHours.forEach((reportByHour, index) => {
                        if (index !== 24) {
                            this.reportByHours[24].topUpCount += reportByHour.topUpCount || 0;
                            this.reportByHours[24].topUpSum += reportByHour.topUpSum || 0;
                            this.reportByHours[24].withdrawCount += reportByHour.withdrawCount || 0;
                            this.reportByHours[24].withdrawSum += reportByHour.withdrawSum || 0;
                        }
                    });
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.reportByHourLoading = false;
                }
            },

            async fetchLeaderboard(options = {}) {
                try {
                    if (options.loading !== false) {
                        this.leaderboardLoading = true;
                    }
                    const { data } = await this.$api.reports.getLeaderboards(this.$route.query);
                    this.leaderboard = data;
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.leaderboardLoading = false;
                }
            },
        },

        head() {
            return {
                title: 'Báo cáo',
            };
        },
    };
</script>

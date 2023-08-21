<template>
    <div class="bg-transparent !shadow-none !p-0">
        <TopUpFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center">
                <span class="text-xl font-semibold text-prim-100">Danh sách nạp tiền</span>
                <div class="flex gap-2">
                    <a-button
                        type="primary"
                        :loading="exportLoading"
                        class="mb-0.5"
                        ghost
                        @click="exportXLSX"
                    >
                        <i v-show="!exportLoading" class="far fa-file-excel mr-2" /> Xuất dữ liệu
                    </a-button>
                    <!-- <a-button type="primary" ghost @click="$refs.topUpDialog.open()">
                        Tạo yêu cầu
                    </a-button> -->
                </div>
            </div>
            <TopUpTable
                :top-ups="[]"
                :loading="loading"
                :pagination="pagination"
                class="mt-4"
            />
            <ct-pagination :length="topUps.length" :data="pagination" />
        </div>
        <TopUpDialog ref="topUpDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TopUpFilter from '@/components/momo/in/Filter.vue';
    import TopUpTable from '@/components/topUps/Table.vue';
    import TopUpDialog from '@/components/topUps/Dialog.vue';

    export default {
        components: {
            TopUpFilter,
            TopUpTable,
            TopUpDialog,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
                exportLoading: false,
            };
        },

        computed: {
            ...mapState('topUps', ['topUps', 'pagination']),
        },

        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
                },
            },
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async exportXLSX() {
                try {
                    this.exportLoading = true;
                    await this.$api.topUps.exportXLSX({
                        ...this.$route.query,
                        download: true,
                        page: undefined,
                    });
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.exportLoading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách yêu cầu nạp tiền',
            };
        },
    };
</script>

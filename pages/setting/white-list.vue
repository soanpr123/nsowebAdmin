temp<template>
    <div class="bg-transparent !shadow-none !p-0">
        <WhitelistFilter class="bg-white shadow-light p-4" />
        <div class="mt-4 bg-white shadow-light p-4">
            <div class="flex flex-wrap justify-between items-center gap-4">
                <span class="text-xl font-semibold text-prim-100">Danh sách IP được phép truy cập</span>
                <div class="flex gap-2">
                    <!-- <a-button
                        type="primary"
                        :loading="exportLoading"
                        class="mb-0.5"
                        ghost
                        @click="exportXLSX"
                    >
                        <i v-show="!exportLoading" class="far fa-file-excel mr-2" /> Xuất dữ liệu
                    </a-button> -->
                    <a-button type="primary" ghost @click="$refs.whitelistDialog.open()">
                        <i class="fas fa-plus mr-2" /> Thêm IP
                    </a-button>
                </div>
            </div>
            <WhitelistTable
                :whitelists="whitelists"
                :loading="loading"
                :pagination="pagination"
                class="mt-4"
                @editing="isEditing => setAutoFetch(false)"
            />
            <ct-pagination :length="whitelists.length" :data="pagination" />
        </div>
        <WhitelistDialog ref="whitelistDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import WhitelistDialog from '@/components/whitelists/Dialog.vue';
    import WhitelistFilter from '@/components/whitelists/Filter.vue';
    import WhitelistTable from '@/components/whitelists/Table.vue';

    export default {
        components: {
            WhitelistDialog,
            WhitelistFilter,
            WhitelistTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
                fetchInterval: null,
                exportLoading: false,
            };
        },

        computed: {
            ...mapState(['autoFetch']),
            ...mapState('whitelists', ['whitelists', 'pagination']),
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
                try {
                    if (options.loading !== false) {
                        this.loading = true;
                    }
                    await this.$store.dispatch('whitelists/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async exportXLSX() {
                try {
                    this.exportLoading = true;
                    await this.$api.whitelists.exportXLSX({
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
                title: 'Danh sách IP được phép truy cập',
            };
        },
    };
</script>

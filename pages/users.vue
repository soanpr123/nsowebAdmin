<template>
    <div>
        <div class="flex justify-between items-center">
            <div class="font-semibold text-prim-100 text-xl">
                Danh sách tài khoản
            </div>
            <a-button type="primary" ghost @click="$refs.userDialog.open()">
                Thêm mới
            </a-button>
        </div>
        <UserTable
            class="mt-4"
            :loading="loading"
            :users="users"
            :pagination="pagination"
        />
        <ct-pagination :length="users.length" :data="pagination" />
        <UserDialog ref="userDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import UserDialog from '@/components/users/Dialog.vue';
    import UserTable from '@/components/users/Table.vue';

    export default {
        components: {
            UserDialog,
            UserTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('users', ['users', 'pagination']),
        },

        watch: {
            '$route.query': {
                async handler() {
                    await this.fetchData();
                },
                deep: true,
                immediate: true,
            },
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('users/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách tài khoản',
            };
        },
    };
</script>

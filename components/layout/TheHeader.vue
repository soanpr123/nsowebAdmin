<template>
    <div class="bg-white py-4 px-4 md:px-6 flex justify-between items-center border-b border-gray-5">
        <div>
            <div class="md:hidden cursor-pointer" @click="toggleSidebar">
                <i class="fas fa-bars text-lg" />
            </div>
            <div class="hidden lg:block text-prim-100 font-semibold">
                AutoBank - Hệ thống nạp rút tự động
            </div>
        </div>
        <div class="flex items-center gap-6">
            <span class="flex items-center gap-2">
                <a-switch :checked="autoFetch" size="small" @change="toggleAutoFetch" />
                Đồng bộ
            </span>
            <a href="tel:024 35 000000" class="font-semibold">
                <i class="fas fa-phone-alt text-gray-100" /> <span class="hidden md:inline text-red-100">1900 1090</span>
            </a>
            <div class="font-semibold">
                <i class="fas fa-question-circle" /> <span class="hidden md:inline">Trợ giúp</span>
            </div>
            <div class="flex items-center gap-2">
                <a-avatar>
                    <i class="fas fa-user" />
                </a-avatar>
                <a-dropdown :trigger="['click']">
                    <div class="cursor-pointer font-semibold">
                        {{ authUser.username }}
                        <i class="fas fa-chevron-down" />
                    </div>
                    <template #overlay>
                        <a-menu class="!mt-3">
                            <!-- <a-menu-item class="!py-2" @click="$refs.updateInfoDialog.open()">
                                <i class="mr-4 fas fa-user" />Cập nhật thông tin
                            </a-menu-item> -->
                            <a-menu-item class="!py-2" @click="$refs.updatePasswordDialog.open()">
                                <i class="mr-4 fas fa-key" />Đổi mật khẩu
                            </a-menu-item>
                            <a-menu-item class="!py-2" @click="logout">
                                <i class="mr-4 fas fa-sign-out-alt" />Đăng xuất
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <a-drawer
            class="header-sidebar-drawer"
            :visible="sidebarVisible"
            placement="left"
            @close="sidebarVisible = false"
        >
            <TheSidebar class="h-full" style="width: 100% !important" />
        </a-drawer>
        <UpdateInfoDialog ref="updateInfoDialog" />
        <UpdatePasswordDialog ref="updatePasswordDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TheSidebar from '@/components/layout/TheSidebar.vue';
    import UpdateInfoDialog from '@/components/auth/dialogs/UpdateInfo.vue';
    import UpdatePasswordDialog from '@/components/auth/dialogs/UpdatePassword.vue';

    export default {
        components: {
            TheSidebar,
            UpdateInfoDialog,
            UpdatePasswordDialog,
        },

        data() {
            return {
                sidebarVisible: false,
            };
        },

        computed: {
            ...mapState(['autoFetch']),

            authUser() {
                return this.$auth.user;
            },
        },

        methods: {
            toggleSidebar() {
                this.sidebarVisible = !this.sidebarVisible;
            },

            async logout() {
                await this.$auth.logout();
                this.$router.push('/login');
            },

            toggleAutoFetch() {
                this.$store.commit('SET_AUTO_FETCH', !this.autoFetch);
            },
        },
    };
</script>

<style lang="scss">
    .header-sidebar-drawer {
        .ant-drawer-body {
            @apply p-0 h-full #{!important};
        }
    }
</style>

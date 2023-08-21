<template>
    <div class="bg-[#031634] a-the-sidebar-vertical max-h-screen h-full flex flex-col" :class="{ '!w-[240px]': !collapsed }">
        <div class="flex justify-center items-center mt-4 mx-4 h-[40px]">
            <nuxt-link to="/">
                <!-- <img v-if="!collapsed" src="/images/logo-3.png" width="150">  -->
                <span v-if="!collapsed" class="text-4xl font-semibold text-white font-sans">AutoBank</span>
                <img v-else src="/images/logo.png" width="40" class="mx-auto">
            </nuxt-link>
        </div>
        <a-menu v-model="activeKeys" :inline-collapsed="collapsed" :default-open-keys="openKeys"
            class="!mt-6 w-[240px] flex-grow overflow-y-auto custom-scroll overflow-x-hidden !p-4 !border-r-0" mode="inline"
            @click="handleClick">
            <template v-for="menuItem in menuItems">
                <a-sub-menu v-if="menuItem.childs.length && checkRole(menuItem)" :key="menuItem.route"
                    :style="menuItem.style">
                    <template slot="title">
                        <i :class="menuItem.icon" />
                        <span class="truncate">
                            {{ menuItem.label }}
                        </span>
                    </template>
                    <template v-for="menuItemChild in menuItem.childs">
                        <template v-if="checkRole(menuItemChild)">
                            <a-menu-item v-if="menuItemChild.route && menuItemChild.childs.length === 0"
                                :key="menuItemChild.route">
                                <nuxt-link :to="menuItemChild.route" class="truncate">
                                    {{ menuItemChild.label }}
                                </nuxt-link>
                            </a-menu-item>
                            <a-sub-menu v-else-if="menuItemChild.route" :key="menuItemChild.route">
                                <template slot="title">
                                    <span v-if="menuItemChild.route" class="truncate">
                                        {{ menuItemChild.label }}
                                    </span>
                                </template>
                                <template v-for="item in menuItemChild.childs">
                                    <a-menu-item v-if="item.route" :key="item.route">
                                        <nuxt-link :to="item.route" class="truncate">
                                            {{ item.label }}
                                        </nuxt-link>
                                    </a-menu-item>
                                </template>
                            </a-sub-menu>
                        </template>
                    </template>
                </a-sub-menu>
                <a-menu-item v-else-if="checkRole(menuItem)" :key="menuItem.route" :style="menuItem.style">
                    <i :class="menuItem.icon" />
                    <nuxt-link :to="menuItem.route" class="truncate">
                        {{ menuItem.label }}
                    </nuxt-link>
                </a-menu-item>
            </template>
        </a-menu>
        <div v-if="!isMobile" class="bg-gray-80 text-white text-center cursor-pointer py-2.5 h-[39px]"
            @click="toggleCollapsed">
            <i class="fas fa-chevron-left text-xl transform duration-200" :class="{ 'rotate-180': collapsed }" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import menuItems from '@/constants/menuItems';

export default {
    data() {
        return {
            menuItems,
            openKeys: ['/sms'],
            activeKeys: [],
            logoutVisible: false,
            collapsed: false,
        };
    },

    computed: {
        ...mapState(['isMobile']),
    },

    watch: {
        '$route.path': {
            handler() {
                this.activeKeys = [this.$route.path];
            },
        },
    },

    async mounted() {
        this.collapsed = this.isMobile ? false : localStorage.getItem('sidebarCollapsed') === 'true' || false;
        this.$store.commit('SET_AUTO_FETCH', localStorage.getItem('autoFetch') === 'true');
        this.activeKeys = [this.$route.path];
    },

    methods: {
        handleClick({ key }) {
            if (key !== this.$route.path) {
                this.$router.push(key);
            }
        },

        checkRole(menuItem) {
            if (menuItem?.roles?.length) {
                return true;
            }

            return true;
        },

        handleOpenChange(keys) {
            this.openKeys = keys?.length ? [keys?.pop()] : [];
        },

        toggleCollapsed() {
            this.collapsed = !this.collapsed;
            localStorage.setItem('sidebarCollapsed', this.collapsed);
        },
    },
};
</script>

<style lang="scss">
.a-the-sidebar-vertical:not(.a-menu--collapse) {
    .ant-menu {
        @apply bg-[#031634];
    }

    .ant-menu-inline {
        @apply border-0;
    }

    .ant-menu-sub {
        .ant-menu-item {
            @apply pl-8 #{!important};
        }
    }

    .ant-menu-submenu-arrow {
        @apply text-right;
    }

    .ant-menu-item,
    .ant-menu-submenu-title {
        height: auto !important;
        @apply text-white flex items-center;
        @apply m-0 px-4 my-2 rounded #{!important};

        >span {
            @apply flex-grow;
        }

        i {
            @apply text-lg w-4 mr-4 mb-1 #{!important};
        }

        .ant-menu-submenu-arrow {
            @apply mr-0;

            &::after,
            &::before {
                @apply bg-white #{!important};
            }
        }

        &-selected {
            @apply bg-[#2ea1ff];

            &::after {
                @apply hidden;
            }
        }
    }
}
</style>

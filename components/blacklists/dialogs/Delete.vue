<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Xóa tài khoản"
    >
        <div>
            Xác nhận xóa tài khoản <span class="font-semibold">{{ _get(blacklist, 'bankAccNumber') }}</span>?
        </div>
        <div slot="footer" class="flex justify-end items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="handleConfirm"
            >
                Xóa
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import _get from 'lodash/get';

    export default {
        data() {
            return {
                visible: false,
                loading: false,
                blacklist: {},
            };
        },

        methods: {
            _get,

            open(blacklist) {
                this.blacklist = blacklist;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleConfirm() {
                try {
                    this.loading = true;
                    await this.$api.blacklists.delete(this.blacklist.id);
                    this.$nuxt.refresh();
                    this.$message.success('Xóa tài khoản thành công');
                    this.close();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

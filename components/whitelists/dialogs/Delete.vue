<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Xóa địa chỉ IP"
    >
        <div>
            Xác nhận xóa địa chỉ IP <span class="font-semibold">{{ _get(whitelist, 'ip') }}</span>?
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
                whitelist: {},
            };
        },

        methods: {
            _get,

            open(whitelist) {
                this.whitelist = whitelist;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleConfirm() {
                try {
                    this.loading = true;
                    await this.$api.whitelists.delete(this.whitelist.id);
                    this.$nuxt.refresh();
                    this.$message.success('Xóa địa chỉ IP thành công');
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

<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${whitelist ? 'Chỉnh sửa' : 'Thêm mới'} IP`"
        width="400px"
    >
        <WhitelistForm ref="whitelistForm" :whitelist="whitelist" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.whitelistForm.submit()"
            >
                {{ whitelist ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import WhitelistForm from '@/components/whitelists/Form.vue';

    export default {
        components: {
            WhitelistForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                whitelist: null,
            };
        },

        methods: {
            open(whitelist) {
                this.whitelist = whitelist;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.whitelist) {
                    await this.updateWhitelist(form);
                } else {
                    await this.createWhitelist(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createWhitelist(form) {
                try {
                    this.loading = true;
                    await this.$api.whitelists.create(form);
                    this.close();
                    this.$message.success('Thêm IP thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateWhitelist(form) {
                try {
                    this.loading = true;
                    await this.$api.whitelists.update(this.whitelist.id, form);
                    this.close();
                    this.$message.success('Cập nhật IP thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

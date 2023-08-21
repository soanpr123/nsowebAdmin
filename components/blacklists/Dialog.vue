<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${blacklist ? 'Chỉnh sửa' : 'Thêm mới'} khóa tài khoản`"
        width="400px"
    >
        <BlacklistForm ref="blacklistForm" :blacklist="blacklist" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.blacklistForm.submit()"
            >
                {{ blacklist ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import BlacklistForm from '@/components/blacklists/Form.vue';

    export default {
        components: {
            BlacklistForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                blacklist: null,
            };
        },

        methods: {
            open(blacklist) {
                this.blacklist = blacklist;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.blacklist) {
                    await this.updateBlacklist(form);
                } else {
                    await this.createBlacklist(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createBlacklist(form) {
                try {
                    this.loading = true;
                    await this.$api.blacklists.create(form);
                    this.close();
                    this.$message.success('Thêm khóa tài khoản thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateBlacklist(form) {
                try {
                    this.loading = true;
                    await this.$api.blacklists.update(this.blacklist.id, form);
                    this.close();
                    this.$message.success('Cập nhật khóa tài khoản thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

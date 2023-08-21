<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${user ? 'Chỉnh sửa' : 'Thêm mới'} tài khoản`"
        width="450px"
    >
        <UserForm ref="userForm" :user="user" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.userForm.submit()"
            >
                {{ user ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import UserForm from '@/components/users/Form.vue';

    export default {
        components: {
            UserForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                user: null,
            };
        },

        methods: {
            open(user) {
                this.user = user;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.user) {
                    await this.updateUser(form);
                } else {
                    await this.createUser(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createUser(form) {
                try {
                    this.loading = true;
                    await this.$api.users.create(form);
                    this.close();
                    this.$message.success('Thêm tài khoản thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateUser(form) {
                try {
                    this.loading = true;
                    await this.$api.users.update(this.user.id, form);
                    this.close();
                    this.$message.success('Cập nhật thông tin tài khoản thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

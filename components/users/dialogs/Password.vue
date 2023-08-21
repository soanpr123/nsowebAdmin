<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        title="Đổi mật khẩu"
        width="650px"
    >
        <UserPasswordForm ref="userPasswordForm" :user="user" @submit="updateUser" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.userPasswordForm.submit()"
            >
                Cập nhật
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import UserPasswordForm from '@/components/users/forms/Password.vue';

    export default {
        components: {
            UserPasswordForm,
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

            async updateUser(form) {
                try {
                    this.loading = true;
                    await this.$api.users.update(this.user.id, form);
                    this.close();
                    this.$message.success('Đổi mật khẩu thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>

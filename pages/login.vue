<template>
    <div class="flex flex-col items-center">
        <a-alert
            v-if="error"
            class="!mt-3 w-full"
            :message="error"
            type="warning"
            show-icon
        />
        <LoginForm
            ref="loginForm"
            :loading="loading"
            class="!mt-3 min-w-[200px] max-w-md w-full"
            @submit="login"
        />
        <div class="text-gray-80 hover:underline cursor-pointer mt-4" @click="forgotPasswordVisible = true">
            Quên mật khẩu
        </div>
        <a-modal
            v-model="forgotPasswordVisible"
            width="500px"
            title="Quên mật khẩu"
            centered
            :footer="false"
        >
            <div class="text-center">
                Vui lòng liên hệ quản trị để cấp lại mật khẩu mới
            </div>
        </a-modal>
    </div>
</template>

<script>
    import LoginForm from '@/components/auth/forms/Login.vue';

    export default {
        layout: 'auth',

        components: {
            LoginForm,
        },

        data() {
            return {
                loading: false,
                error: null,
                forgotPasswordVisible: false,
            };
        },

        methods: {
            login(form) {
                this.loading = true;
                this.$auth.loginWith('local', {
                    data: form,
                }).then(async () => {
                    if (this.$route.query.continue) {
                        this.$router.push(this.$route.query.continue);
                    } else {
                        this.$router.push('/');
                    }
                }).catch((error) => {
                    this.$handleError(error, () => {
                        this.error = error?.response?.data?.error || 'Tên đăng nhập hoặc mật khẩu không chính xác';
                        this.$refs.loginForm.createCaptcha();
                        this.$forceUpdate();
                    });
                }).finally(() => {
                    this.loading = false;
                });
            },
        },

        head() {
            return {
                title: 'Đăng nhập',
            };
        },
    };
</script>

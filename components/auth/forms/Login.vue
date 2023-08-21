<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        class="login-form space-y-4"
    >
        <a-alert
            v-if="error"
            class="!mt-3 w-full"
            :message="error"
            type="warning"
            show-icon
        />
        <a-form-model-item prop="username">
            <a-input
                v-model="form.username"
                size="large"
                placeholder="Tên đăng nhập"
                @keyup.native.enter="handleSubmit"
            >
                <template #prefix>
                    <i class="far fa-user text-prim-90" />
                </template>
            </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
            <a-input-password
                v-model="form.password"
                size="large"
                placeholder="Mật khẩu"
                @keyup.native.enter="handleSubmit"
            >
                <template #prefix>
                    <i class="fas fa-unlock-alt text-prim-90" />
                </template>
            </a-input-password>
        </a-form-model-item>
        <div class="flex gap-4 items-center">
            <a-input
                v-model="form.captchaCode"
                placeholder="Captcha"
                size="large"
                @keyup.native.enter="handleSubmit"
            >
                <template #prefix>
                    <i class="fas fa-spell-check text-prim-90" />
                </template>
            </a-input>
            <div id="captcha" />
            <a-button shape="circle" @click="createCaptcha">
                <i class="fas fa-redo-alt" />
            </a-button>
        </div>
        <a-button
            :loading="loading"
            type="primary"
            size="large"
            class="w-full"
            @click="handleSubmit"
        >
            Đăng nhập
        </a-button>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';

    const defaultForm = {
        username: '',
        password: '',
        captchaCode: '',
    };

    export default {
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                form: _cloneDeep(defaultForm),
                rules: {
                    username: [
                        { required: true, message: 'Vui lòng nhập tên đăng nhập', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                    ],
                },
                captchaCode: undefined,
                error: null,
            };
        },

        mounted() {
            this.createCaptcha();
        },

        methods: {
            handleSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid && this.validateCaptcha()) {
                        this.$emit('submit', this.form);
                    }
                });
            },

            createCaptcha() {
                document.getElementById('captcha').innerHTML = '';
                const charsArray = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const lengthOtp = 4;
                const captcha = [];
                for (let i = 0; i < lengthOtp; i += 1) {
                    const index = Math.floor(Math.random() * charsArray.length + 1); // get the next character from the array
                    if (captcha.indexOf(charsArray[index]) === -1) { captcha.push(charsArray[index]); } else i -= 1;
                }
                const canv = document.createElement('canvas');
                canv.id = 'captcha';
                canv.width = 80;
                canv.height = 50;
                const ctx = canv.getContext('2d');
                ctx.font = '25px Georgia';
                ctx.strokeText(captcha.join(''), 0, 30);
                this.captchaCode = captcha.join('');
                document.getElementById('captcha').appendChild(canv); // adds the canvas to the body element
            },
            validateCaptcha() {
                if (this.form.captchaCode === this.captchaCode) {
                    this.error = undefined;
                    return true;
                }

                this.createCaptcha();
                this.error = 'Mã captcha không chính xác';
                return false;
            },
        },
    };
</script>

<style lang="scss">
    .login-form {
        .ant-input::placeholder {
            @apply text-center;
        }
    }
</style>

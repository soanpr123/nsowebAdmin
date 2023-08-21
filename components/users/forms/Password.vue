<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <a-form-model-item label="Mật khẩu" prop="password">
                <a-input-password v-model="form.password" placeholder="Mật khẩu" autocomplete="new-password" />
            </a-form-model-item>
            <a-form-model-item label="Nhập lại mật khẩu" prop="passwordConfirmation">
                <a-input-password v-model="form.passwordConfirmation" placeholder="Nhập lại mật khẩu" autocomplete="new-password" />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _map from 'lodash/map';
    import _pick from 'lodash/pick';
    import { passwordValidtor } from '@/utils/form';

    const defaultForm = {
        password: '',
    };

    export default {
        props: {
            user: Object,
        },

        data() {
            const passwordConfirmValidator = async (_rule, value) => {
                if (value !== this.form.password) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Nhập lại mật khẩu không đúng');
                }

                return Promise.resolve();
            };

            return {
                form: this.user
                    ? _cloneDeep({ ...this.user, password: '', groups: _map(this.user.groups, 'id') })
                    : _cloneDeep(defaultForm),
                rules: {
                    password: [
                        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'change' },
                        { validator: passwordValidtor, trigger: 'blur' },

                    ],
                    passwordConfirmation: [
                        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                        { validator: passwordConfirmValidator, triggler: 'blur' },
                    ],
                },
            };
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', _pick(this.form, Object.keys(defaultForm)));
                    }
                });
            },
        },
    };
</script>

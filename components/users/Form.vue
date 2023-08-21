<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <a-form-model-item label="Username" prop="username">
            <a-input v-model="form.username" placeholder="Nhập username" autocomplete="new-password" />
        </a-form-model-item>
        <a-form-model-item v-if="!user" label="Password" prop="password">
            <a-input-password v-model="form.password" placeholder="Nhập password" autocomplete="new-password" />
        </a-form-model-item>
        <a-form-model-item v-if="$auth.user.type === 'root'" label="Merchant id" prop="merchantId">
            <a-input v-model.number="form.merchantId" placeholder="Nhập merchantId" />
        </a-form-model-item>
        <a-form-model-item label="Quyền" prop="type">
            <a-select v-model="form.type" placeholder="Chọn quyền">
                <a-select-option v-for="type in types" :key="type" :value="type">
                    {{ type }}
                </a-select-option>
            </a-select>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _map from 'lodash/map';
    import _pick from 'lodash/pick';
    import { usernameValidator } from '@/utils/form';

    const defaultForm = {
        username: '',
        type: undefined,
        password: null,
        merchantId: 1,
    };

    export default {
        props: {
            user: Object,
        },

        data() {
            return {
                form: this.user
                    ? _cloneDeep({ ...this.user, password: '', groups: _map(this.user.groups, 'id') })
                    : _cloneDeep(defaultForm),
                rules: {
                    username: [
                        { required: true, message: 'Vui lòng nhập tên tài khoản', trigger: 'blur' },
                        { validator: usernameValidator, trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: 'Vui lòng nhập quyền', trigger: 'blur' },
                    ],
                },
                types: ['admin', 'mod', 'report', 'client'],
            };
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.user ? _pick(this.form, ['username', 'type', 'merchantId']) : this.form);
                    }
                });
            },
        },
    };
</script>

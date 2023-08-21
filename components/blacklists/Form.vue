<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <a-form-model-item label="Số tài khoản" prop="bankAccNumber">
            <a-input v-model="form.bankAccNumber" placeholder="Số tài khoản" />
        </a-form-model-item>
        <a-form-model-item label="Nickname" prop="partnerReference">
            <a-input v-model="form.partnerReference" placeholder="Nhập nickname" />
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';
    import { validTextNumberString } from '@/utils/form';

    const defaultForm = {
        bankAccNumber: undefined,
        partnerReference: undefined,
    };

    export default {
        props: {
            blacklist: Object,
        },

        data() {
            return {
                form: this.blacklist
                    ? _cloneDeep(_pick(this.blacklist, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                rules: {
                    bankAccNumber: [
                        { required: true, message: 'Vui lòng nhập số tài khoản', trigger: 'blur' },
                        { validator: validTextNumberString, trigger: 'blur' },
                    ],
                    partnerReference: [
                        { validator: validTextNumberString, trigger: 'blur' },
                    ],
                },
            };
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>

<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <a-form-model-item label="Địa chỉ IP" prop="ip">
            <a-input v-model="form.ip" placeholder="Nhập địa chỉ" />
        </a-form-model-item>
        <a-form-model-item label="Tên" prop="name">
            <a-input v-model="form.name" placeholder="Nhập tên" />
        </a-form-model-item>
        <a-form-model-item label="Note" prop="note">
            <a-input
                v-model="form.note"
                type="textarea"
                :rows="3"
                placeholder="Nhập note"
            />
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';

    const defaultForm = {
        name: '',
        ip: '',
        note: '',
    };

    export default {
        props: {
            whitelist: Object,
        },

        data() {
            return {
                form: this.whitelist
                    ? _cloneDeep(_pick(this.whitelist, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                rules: {
                    ip: [
                        { required: true, message: 'Vui lòng nhập địa chỉ IP', trigger: 'blur' },
                    ],
                },
            };
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', {
                            ...this.form,
                            ip: this.form.ip?.trim?.(),
                        });
                    }
                });
            },
        },
    };
</script>

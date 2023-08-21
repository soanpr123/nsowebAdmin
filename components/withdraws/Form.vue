<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <a-form-model-item class="col-span-2" label="Ngân hàng" prop="napasId">
                <SelectRemote
                    v-model="form.napasId"
                    fetch-url="banks/fetchAll"
                    option-label="bankFullName"
                    option-value="napasId"
                    store="banks"
                    store-prop="banks"
                    placeholder="Ngân hàng"
                />
            </a-form-model-item>
            <a-form-model-item label="Số tài khoản nhận" prop="bankAccNumber">
                <a-input v-model="form.bankAccNumber" placeholder="Số tài khoản nhận" />
            </a-form-model-item>
            <a-form-model-item label="Tên tài khoản nhận" prop="bankAccName">
                <a-input v-model="form.bankAccName" placeholder="Tên tài khoản nhận" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Tên liên kết" prop="partnerReference">
                <a-input v-model="form.partnerReference" placeholder="Tên liên kết" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Số tiền rút" prop="transferAmount">
                <ct-currency-input v-model="form.transferAmount" placeholder="Số tiền rút" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Note" prop="note">
                <a-input v-model="form.note" placeholder="Note" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Nội dung chuyển khoản" prop="transferMessage">
                <a-input
                    v-model="form.transferMessage"
                    type="textarea"
                    :rows="4"
                    placeholder="Nội dung chuyển khoản"
                />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    const defaultForm = {
        note: '',
        transferMessage: '',
        transferAmount: undefined,
        requestId: undefined,
        partnerReference: '',
        bankAccNumber: '',
        bankAccName: '',
        napasId: undefined,
    };

    export default {
        components: {
            SelectRemote,
        },

        props: {
            withdraw: Object,
        },

        data() {
            return {
                form: this.withdraw
                    ? _cloneDeep(_pick(this.withdraw, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                rules: {

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

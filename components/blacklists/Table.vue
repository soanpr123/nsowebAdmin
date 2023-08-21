<template>
    <div>
        <a-table
            :data-source="blacklists"
            :loading="loading"
            :scroll="{ x: 500 }"
            :pagination="false"
        >
            <a-table-column
                key="index"
                title="STT"
                :width="60"
                :custom-render="(text, record, index) => index + 1"
            />
            <a-table-column
                key="bankAccNumber"
                title="SỐ TK"
                data-index="bankAccNumber"
                :width="110"
            />
            <a-table-column
                key="partnerReference"
                title="NICKNAME"
                data-index="partnerReference"
                :width="130"
            />
            <a-table-column
                key="createdAt"
                title="TIME TẠO"
                data-index="createdAt"
                :width="125"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('dd/MM/yyyy HH:mm') }}
                </template>
            </a-table-column>
            <a-table-column
                key="updatedAt"
                title="TIME UPDATE"
                data-index="updatedAt"
                :width="125"
            >
                <template #default="updatedAt">
                    {{ updatedAt | dateFormat('dd/MM/yyyy HH:mm') }}
                </template>
            </a-table-column>
            <a-table-column
                key="actions"
                align="center"
                title="ACTION"
                :width="110"
            >
                <template #default="bankAccount">
                    <a-button type="danger" ghost @click="$refs.blacklistDeleteDialog.open(bankAccount)">
                        <i class="fas fa-trash-alt text-sm" />
                    </a-button>
                </template>
            </a-table-column>
        </a-table>
        <BlacklistDeleteDialog ref="blacklistDeleteDialog" />
    </div>
</template>

<script>
    import BlacklistDeleteDialog from '@/components/blacklists/dialogs/Delete.vue';

    export default {
        components: {
            BlacklistDeleteDialog,
        },

        props: {
            blacklists: {
                type: Array,
                required: true,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: {
                type: Object,
                required: false,
            },
        },
    };
</script>

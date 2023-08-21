<template>
    <div>
        <a-table
            :data-source="whitelists"
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
                key="ip"
                title="ĐỊA CHỈ IP"
                data-index="ip"
                :width="300"
            />
            <a-table-column
                key="name"
                title="TÊN"
                data-index="name"
                :width="150"
            />
            <a-table-column
                key="note"
                title="NOTE"
                data-index="note"
                :width="150"
            />
            <a-table-column
                key="actions"
                align="center"
                title="ACTION"
                :width="110"
            >
                <template #default="whitelist">
                    <a-button type="primary" ghost @click="$refs.whitelistDialog.open(whitelist)">
                        <i class="fas fa-pen text-sm" />
                    </a-button>
                    <a-button type="danger" ghost @click="$refs.whitelistDeleteDialog.open(whitelist)">
                        <i class="fas fa-trash-alt text-sm" />
                    </a-button>
                </template>
            </a-table-column>
        </a-table>
        <WhitelistDialog ref="whitelistDialog" />
        <WhitelistDeleteDialog ref="whitelistDeleteDialog" />
    </div>
</template>

<script>
    import WhitelistDialog from '@/components/whitelists/Dialog.vue';
    import WhitelistDeleteDialog from '@/components/whitelists/dialogs/Delete.vue';

    export default {
        components: {
            WhitelistDialog,
            WhitelistDeleteDialog,
        },

        props: {
            whitelists: {
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

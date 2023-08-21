<template>
    <div>
        <a-table :data-source="users" :loading="loading" :pagination="false">
            <a-table-column v-if="pagination" key="index" title="STT" :width="60" :custom-render="getIndex" />
            <a-table-column key="username" title="USERNAME" data-index="username" :width="150" />
            <a-table-column key="type" title="QUYỀN" data-index="type" align="center" :width="130" />
            <a-table-column key="status" title="TRẠNG THÁI" align="center" :width="150">
                <template #default="record">
                    <a-switch :default-checked="record.status === USER_STATUS.ACTIVE" @change="toggleStatus(record)" />

                </template>
            </a-table-column>
            <a-table-column key="createdAt" title="NGÀY TẠO" data-index="createdAt" :width="120">
                <template #default="createdAt">
                    {{ createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column key="updatedAt" title="NGÀY UPDATE" data-index="updatedAt" :width="120">
                <template #default="updatedAt">
                    {{ updatedAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column key="actions" title="HÀNH ĐỘNG" align="center" :width="100">
                <template slot-scope="record">
                    <button @click="$refs.userDialog.open(record)">
                        <i class="text-gray-80 fas fa-pen mr-2" />
                    </button>
                    <button @click="$refs.userPasswordDialog.open(record)">
                        <i class="text-gray-80 fas fa-key mr-2" />
                    </button>
                    <button @click="$refs.userDeleteDialog.open(record)">
                        <i class="fas fa-trash-alt text-red-100" />
                    </button>
                </template>
            </a-table-column>
        </a-table>
        <UserDialog ref="userDialog" />
        <UserPasswordDialog ref="userPasswordDialog" />
        <UserDeleteDialog ref="userDeleteDialog" />
    </div>
</template>

<script>
import { USER_STATUS } from '@/constants/user/status';
import UserDialog from '@/components/users/Dialog.vue';
import UserPasswordDialog from '@/components/users/dialogs/Password.vue';
import UserDeleteDialog from '@/components/users/dialogs/Delete.vue';

export default {
    components: {
        UserDialog,
        UserPasswordDialog,
        UserDeleteDialog,
    },

    props: {
        users: {
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

    data() {
        return {
            USER_STATUS,
        };
    },

    methods: {
        getIndex(text, record, index) {
            return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
        },

        async toggleStatus(user) {
            try {
                await this.$api.users.update(user.id, {
                    status: user.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE,
                });
                this.$message.success('Cập nhật trạng thái tài khoản thành công');
                await this.$nuxt.refresh();
            } catch (error) {
                this.$handleError(error);
            }
        },
    },
};
</script>

<template>
    <div>
        <div class="bg-white shadow-light p-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 items-end">
            <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 col-span-2">
                <DateRangeFilter
                    class="col-span-1 2xl:col-span-2"
                    label="Khoảng ngày"
                    start-of="day"
                    :separator="false"
                    placeholder="Khoảng ngày"
                    :allow-clear="false"
                    query="Date"
                />
                <SelectFilter
                    query="status"
                    label="Trạng thái duyệt"
                    placeholder="Tất cả"
                    :options="WITHDRAW_STATUS_OPTIONS"
                />
            </div>
            <SelectFilter
                class="col-span-2 md:col-span-1"
                query="statusTransfer"
                label="Trạng thái chuyển"
                placeholder="Tất cả"
                :options="WITHDRAW_TRANSFER_STATUS_OPTIONS"
            />
            <SearchFilter
                query="partnerReference"
                class="col-span-2 md:col-span-1"
                label="NickName"
                placeholder="Nhập nickname"
            />
            <SearchFilter
                query="transferId"
                class="col-span-2 md:col-span-1"
                label="Mã GD"
                placeholder="Nhập transID"
            />
        </div>
        <div class="mt-4 grid grid-cols-5 gap-4 whitespace-nowrap mb-2">
            <div class="bg-white shadow-light p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 col-span-5 lg:col-span-3">
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row sm:flex-col 2xl:flex-row gap-2 flex-wrap">
                        Đã duyệt:
                        <span
                            class="cursor-pointer hover:underline text-green-100"
                            @click="handleFilter('status', WITHDRAW_STATUS.SUCCESS)"
                        >
                            {{ summary.sumSuccess | currencyFormat }} | {{ summary.countSuccess }} GD
                        </span>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row sm:flex-col 2xl:flex-row gap-2 flex-wrap">
                        Chờ duyệt:
                        <span
                            class="cursor-pointer hover:underline text-yellow-100"
                            @click="handleFilter('status', WITHDRAW_STATUS.PENDING)"
                        >
                            {{ summary.sumPendding | currencyFormat }} | {{ summary.countPendding }} GD
                        </span>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row sm:flex-col 2xl:flex-row gap-2 flex-wrap">
                        Từ chối:
                        <span
                            class="cursor-pointer hover:underline text-red-100"
                            @click="handleFilter('status', WITHDRAW_STATUS.CANCELED)"
                        >
                            {{ summary.sumError | currencyFormat }} | {{ summary.countError }} GD
                        </span>
                    </div>
                </div>
            </div>
            <div class="bg-white shadow-light p-4 grid grid-cols-2 col-span-5 lg:col-span-2">
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row md:flex-col 2xl:flex-row gap-2 flex-wrap">
                        Đã chuyển:
                        <span
                            class="cursor-pointer hover:underline text-prim-90"
                            @click="handleFilter('statusTransfer', WITHDRAW_TRANSFER_STATUS.SUCCESS)"
                        >
                            {{ summary.sumTransferSuccess | currencyFormat }} | {{ summary.countTransferSuccess }} GD
                        </span>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex flex-row md:flex-col 2xl:flex-row gap-2 flex-wrap">
                        Chuyển thất bại:
                        <span
                            class="cursor-pointer hover:underline text-red-100"
                            @click="handleFilter('statusTransfer', WITHDRAW_TRANSFER_STATUS.ERROR)"
                        >
                            {{ summary.sumTransferError | currencyFormat }} | {{ summary.countTransferError }} GD
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { WITHDRAW_STATUS, WITHDRAW_STATUS_OPTIONS } from '@/constants/withdraw/status';
    import { WITHDRAW_TRANSFER_STATUS, WITHDRAW_TRANSFER_STATUS_OPTIONS } from '@/constants/withdraw/transferStatus';
    import DateRangeFilter from '@/components/filters/DateRange.vue';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            DateRangeFilter,
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                WITHDRAW_STATUS,
                WITHDRAW_STATUS_OPTIONS,
                WITHDRAW_TRANSFER_STATUS,
                WITHDRAW_TRANSFER_STATUS_OPTIONS,
            };
        },

        computed: {
            ...mapState('withdraws', ['summary']),
        },

        methods: {
            handleFilter(key, value) {
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        [key]: value,
                    },
                });
            },

            empty() {
                this.$router.push('/withdraws');
                this.$forceUpdate();
            },
        },
    };
</script>

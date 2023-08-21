<template>
    <a-table
        :data-source="data"
        :loading="loading"
        :pagination="false"
    >
        <a-table-column
            v-if="pagination"
            key="index"
            title="STT"
            :width="60"
            :custom-render="getIndex"
        />
        <a-table-column
            key="orderId"
            title="MÃ XÁC NHẬN"
            :width="135"
            data-index="orderId"
        >
            <template #default="orderId">
                <nuxt-link :to="`/receptionist/orders/${orderId}`" class="!text-prim-90 hover:underline">
                    {{ orderId }}
                </nuxt-link>
            </template>
        </a-table-column>
        <a-table-column
            key="bookingCode"
            title="MÃ BOOKING"
            data-index="bookingCode"
            :width="130"
        />
        <a-table-column
            key="guestName"
            title="KHÁCH HÀNG"
            :width="200"
            data-index="guestName"
            class="font-semibold"
        />
        <a-table-column
            key="roomType"
            title="LOẠI PHÒNG"
            :width="130"
            data-index="roomType.name"
        />
        <a-table-column
            key="roomNo"
            title="SỐ PHÒNG"
            :width="120"
            data-index="roomNo"
        />
        <a-table-column
            key="dateFrom"
            title="NGÀY ĐẾN"
            :width="120"
            data-index="dateFrom"
        >
            <template #default="dateFrom">
                {{ dateFrom | dateFormat }}
            </template>
        </a-table-column>
        <a-table-column
            key="dateTo"
            title="NGÀY ĐI"
            :width="120"
            data-index="dateTo"
        >
            <template #default="dateTo">
                {{ dateTo | dateFormat }}
            </template>
        </a-table-column>
        <a-table-column
            key="hotelPartner"
            title="CÔNG TY"
            :width="200"
            over
            data-index="hotelPartner.name"
        />
    </a-table>
</template>

<script>
    export default {
        props: {
            data: {
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

        methods: {
            getIndex(text, record, index) {
                return (parseInt(+this.pagination.page, 10) - 1) * this.pagination.pageSize + index + 1;
            },
        },
    };
</script>

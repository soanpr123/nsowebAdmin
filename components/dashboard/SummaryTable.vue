<template>
    <table
        class="dashboard-table rounded-sm"
        :style="{
            width: `${245 + ((reports.length+1) * 119)}px`,
        }"
        cellspacing="0"
        cellpadding="6"
        border="1"
    >
        <thead>
            <tr>
                <th class="ant-table-row-cell-break-word !w-[95px] text-center">
                    MĐ
                </th>
                <th class="ant-table-row-cell-break-word text-center !w-[70px]">
                    Loại
                </th>
                <th class="ant-table-row-cell-break-word !w-[80px]">
                    Count
                </th>
                <th v-for="report in reports" :key="report.id" class="ant-table-row-cell-break-word text-center !w-[119px]">
                    {{ report.createdAt | dateFormat }}
                </th>
                <!-- <th class="ant-table-row-cell-break-word !w-[119px] text-center">
                    SUM
                </th> -->
            </tr>
        </thead>
        <tbody>
            <tr style="height: 20px">
                <td rowspan="6" class="text-center font-semibold">
                    NẠP
                </td>
                <td class="text-center" rowspan="3">
                    Bank
                </td>
                <td>
                    Số lệnh
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right">
                    {{ report.countRequestTopup | numberFormat }}
                </td>
                <!-- <td class="text-right">
                    {{ summary.countRequestTopup | numberFormat }}
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td>
                    Số người
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right">
                    {{ report.countNickNameTopup | numberFormat }}
                </td>
                <!-- <td class="text-right">
                    {{ summary.countNickNameTopup | numberFormat }}
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td>
                    Số tiền
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right text-green-100">
                    {{ report.totalTopup | numberFormat }}
                </td>
                <!-- <td class="text-right text-green-100">
                    {{ summary.totalTopup | numberFormat }}
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td class="text-center" rowspan="3">
                    Momo
                </td>
                <td>
                    Số lệnh
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right">
                    0
                </td>
                <!-- <td class="text-right">
                    0
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td>
                    Số người
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right">
                    0
                </td>
                <!-- <td class="text-right">
                    0
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td>
                    Số tiền
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right text-green-100">
                    {{ 0 | numberFormat }}
                </td>
                <!-- <td class="text-right text-green-100">
                    0
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td rowspan="3" class="text-center font-semibold">
                    RÚT
                </td>
                <td class="text-center" rowspan="3">
                    Bank
                </td>
                <td>
                    Số lệnh
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right">
                    {{ report.countRequestWithdraw | numberFormat }}
                </td>
                <!-- <td class="text-right">
                    {{ summary.countRequestWithdraw | numberFormat }}
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td>
                    Số người
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right">
                    {{ report.countNickNameWithdraw | numberFormat }}
                </td>
                <!-- <td class="text-right">
                    {{ summary.countNickNameWithdraw | numberFormat }}
                </td> -->
            </tr>
            <tr style="height: 20px">
                <td>
                    Số tiền
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right text-red-100">
                    {{ report.totalWithdraw | numberFormat }}
                </td>
                <!-- <td class="text-right text-red-100">
                    {{ summary.totalWithdraw | numberFormat }}
                </td> -->
            </tr>
            <tr style="height: 40px" class="!bg-[#ffb579]">
                <td class="text-center font-semibold">
                    NẠP - RÚT
                </td>
                <td colspan="2" class="text-center font-semibold">
                    TỔNG HỢP
                </td>
                <td v-for="report in reports" :key="report.id" class="text-right font-semibold">
                    {{ report.totalTopup - report.totalWithdraw | currencyFormat }}
                </td>
                <!-- <td class="text-right font-semibold">
                    {{ summary.totalTopup - summary.totalWithdraw | currencyFormat }}
                </td> -->
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: {
            reports: {
                type: Array,
                required: true,
            },
            summary: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .dashboard-table {
        table, th, td {
            @apply border-[#ebeef5] border #{!important};
        }
        thead {
            @apply font-semibold text-gray-80 bg-[#ebeef5];
        }
    }
</style>

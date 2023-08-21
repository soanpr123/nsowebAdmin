<template>
    <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-7 gap-4 items-end">
        <SearchFilter
            query="transferId"
            class="col-span-2 md:col-span-1"
            label="Số tài khoản"
            placeholder="Nhập số TK"
        />
    </div>
</template>

<script>
    import SearchFilter from '@/components/filters/Search.vue';

    export default {
        components: {
            SearchFilter,
        },
    };
</script>

<template>
    <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-7 gap-4 items-end">
        <SearchFilter
            query="ip"
            class="col-span-2 md:col-span-1"
            label="Địa chỉ IP"
            placeholder="Nhập địa chỉ IP"
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

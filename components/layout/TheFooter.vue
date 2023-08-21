<template>
    <div class="flex justify-between items-center bg-white border-t border-gray-20 py-2 px-4 md:px-8 text-xs md:text-base">
        <div>&copy; {{ currentYear }} - <a href="#" class="text-prim-90 hover:underline"><span class="hidden md:inline-block">CÔNG TY CỔ PHẦN</span><span class="md:hidden">CTY CP</span> NGÂN HÀNG SỐ</a></div>
        <div>Your IP: {{ ip }}</div>
    </div>
</template>

<script>
    export default {
        async fetch() {
            this.ip = await fetch('https://jsonip.com/')
                .then((results) => results.json())
                .then((data) => data.ip);
        },

        data() {
            return {
                ip: null,
                currentYear: (new Date()).getFullYear(),
            };
        },
    };
</script>

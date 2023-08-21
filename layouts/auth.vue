<template>
    <div class="flex justify-between h-screen">
        <div class="w-1/2 hidden md:flex justify-center items-center bg-[#eaf3fa]">
            <img src="/images/auth-bg.jpg" class="w-4/5">
        </div>
        <div class="w-screen md:w-1/2 flex flex-col items-center mx-4 my-4">
            <div class="w-full text-right">
                Your IP: {{ ip }}
            </div>
            <div class="flex-grow flex flex-col items-center justify-center">
                <div class="text-4xl font-semibold text-prim-90 font-sans">
                    AutoBank
                </div>
                <div class="xl:mt-4 mb-12 text-gray-80 text-center">
                    AutoBank - Hệ thống nạp rút tự động
                </div>
                <nuxt class="w-full" />
            </div>
            <div class="text-gray-80 text-center flex justify-center items-center flex-wrap space-x-2">
                <div>Copyright &copy; 2022</div>
                <div>Công ty cổ phần Ngân hàng số</div>
            </div>
        </div>
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
            };
        },
    };
</script>

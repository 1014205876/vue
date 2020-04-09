<template>
    <router-view />
</template>

<script>
import api from "@/service/api";
import apiapi from "@/service/api/api";
export default {
    name: "App",
    data() {
        return {
            over: false
        };
    },
    created() {
        this.getCookie();
    },
    methods: {
        async getCookie() {
            let res = await api.getCookie();
            console.log(res);
        }
    }
};
</script>

<style>
</style>
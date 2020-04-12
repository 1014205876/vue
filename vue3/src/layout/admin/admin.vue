<template>
    <div class="admin">
        <div class="logo">
            <img src="@/assets/image/vuelogo.jpg" alt="logo" />
        </div>
            <appHeader class="head" />
            <appMenu class="menu" />
        <div class="main">
            <router-view />
        </div>
            <appFooter class="foot" />
    </div>
</template>

<script>
import appHeader from "@/layout/header/header.vue";
import appFooter from "@/layout/footer/footer.vue";
import appMenu from "@/layout/menu/menu.vue";

export default {
    name: "appAdmin",
    components: {
        appHeader,
        appMenu,
        appFooter
    }
};
</script>

<style scoped lang="less">
@import url("./admin.less");
</style>
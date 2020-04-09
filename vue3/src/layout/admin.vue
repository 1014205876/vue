<template>
    <div class="body">
        <div class="header">
            <appHeader />
        </div>
        <div class="content">
            <div class="menu">
                <appMenu />
            </div>
            <div class="main">
                <router-view />
            </div>
        </div>
        <div class="footer">
            <appFooter />
        </div>
    </div>
</template>

<script>
import appHeader from "./header";
import appFooter from "./footer";
import appMenu from "./menu";
export default {
    name: "appAdmin",
    components: {
        appHeader,
        appMenu,
        appFooter
    }
};
</script>

<style scoped>
.header {
    height: 40px;
}
.container {
    display: flex;
}
</style>
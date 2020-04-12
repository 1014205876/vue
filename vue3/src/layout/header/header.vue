<template>
    <div class="header">
        <ul class="nav">
            <li v-for="(item,index) in nav" :key="index">
                <a :href="item.url">
                    <el-button type="primary" plain round>{{item.name}}</el-button>
                </a>
            </li>
        </ul>
        <div v-if="userInfo.account" class="userInfo">{{userInfo.account}}</div>
        <div v-else class="userInfo">未登录</div>
    </div>
</template>

<script>
export default {
    name: "appHeader",
    data: () => ({
        //页面数据声明
        userInfo: {},
        nav: []
    }),
    created() {
        this.userInfo=this.$store.state.userInfo
        this.getCookie();
        this.getOtherProject();
    },
    mounted() {},
    beforeDestroy(){
    },
    methods: {
        async getCookie() {
            let res = await this.$api.getCookie();
            if (res.code == 200) {
                this.userInfo.account = res.data.userName;
            } else {
                console.log("登录过期");
            }
        },
        async getOtherProject() {
            let res = await this.$api.getOtherProject();
            if (res.code == 200) {
                this.nav = res.data;
            }
        }
    }
};
</script>

<style scoped lang="less">
@import url("./header.less");
</style>
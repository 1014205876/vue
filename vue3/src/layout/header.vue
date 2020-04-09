<template>
    <div class="header">
        <ul class="nav">
            <li v-for="(item,index) in nav" :key="index">
                <a :href="item.url">
                    <el-button type="primary">{{item.name}}</el-button>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "appHeader",
    components: {},
    data() {
        //页面数据声明
        return {
            nav: [
                {
                    name: "angular项目",
                    url: "http://49.233.43.87:8300/"
                },
            ]
        };
    }
};
</script>

<style scoped>
.header {
    
}
</style>
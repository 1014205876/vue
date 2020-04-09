<template>
    <el-menu :router="true">
        <div v-for="(item,menuIndex) in nav" :key="menuIndex">
            <el-menu-item v-if="item.type == 'link'" :index="''+menuIndex" :route="item.url">
                <template slot="title">{{item.name}}</template>
            </el-menu-item>
            <el-submenu v-if="item.type == 'sub'" :index="''+menuIndex">
                <template slot="title">{{item.name}}</template>
                <el-menu-item-group>
                    <el-menu-item
                        v-for="(list,index) in item.children"
                        :key="index"
                        :index="''+menuIndex+'-'+index"
                        :route="list.url"
                    >{{list.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </div>
    </el-menu>
</template>

<script>
export default {
    name: "appMenu",
    data() {
        //页面数据声明
        return {
            nav: [
                {
                    name: "首页",
                    type: "link",
                    url: "/home"
                },
                {
                    name: "登录",
                    type: "link",
                    url: "/about"
                },
                {
                    name: "练习",
                    type: "sub",
                    children: [
                        {
                            name: "日历",
                            type: "link",
                            url: "/lianxi/calendar"
                        },
                        {
                            name: "表单",
                            type: "link",
                            url: "/lianxi/form"
                        },
                        {
                            name: "黑客帝国",
                            type: "link",
                            url: "/lianxi/heike"
                        },
                        {
                            name: "计算器",
                            type: "link",
                            url: "/lianxi/jisuanqi"
                        },
                        {
                            name: "扫雷",
                            type: "link",
                            url: "/lianxi/saolei"
                        },
                        {
                            name: "上传",
                            type: "link",
                            url: "/lianxi/upload"
                        },
                        {
                            name: "星空",
                            type: "link",
                            url: "/lianxi/xingkong"
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style scoped>
.nav {
}
</style>
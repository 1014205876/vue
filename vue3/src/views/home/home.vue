<template>
    <div class="home">
        <el-form :inline="true" :model="queryParams" class="demo-form-inline">
            <template v-if="type=='2'">
                <el-form-item label="月份">
                    <el-input-number v-model="queryParams.month" :min="1" :max="12" label="请输入月份"></el-input-number>
                </el-form-item>
                <el-form-item label="日期">
                    <el-input-number v-model="queryParams.day" :min="1" :max="31" label="请输入日期"></el-input-number>
                </el-form-item>
            </template>
            <el-form-item label="查询类型">
                <el-select v-model="type" placeholder="选择类型">
                    <el-option label="笑话" value="1"></el-option>
                    <el-option label="历史上的今天" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search(1)">查询</el-button>
                <el-button type="default" @click="reset()">重置</el-button>
                <appRippleButton round plain class="btn">123</appRippleButton>
                <appRippleButton>123</appRippleButton>
            </el-form-item>
        </el-form>
        <template v-if="type=='1'">
            <el-table :data="jokeArr" style="width: 100%">
                <el-table-column width="100" prop="id" label="id"></el-table-column>
                <el-table-column width="200" prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="changePageSize"
                @current-change="changePage"
                :current-page="queryParams.page"
                :page-sizes="[10, 15, 20]"
                :page-size="queryParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryParams.totalCount"
            ></el-pagination>
        </template>
        <template v-if="type=='2'">
            <el-table :data="todayArr">
                <el-table-column prop="_id" label="id"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="address" label="图片">
                    <template slot-scope="scope">
                        <img
                            style="max-width:200px;max-height:50px;display:block"
                            :src="scope.row.pic"
                            alt
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="des" label="内容"></el-table-column>
                <el-table-column prop="address" label="时间">
                    <template
                        slot-scope="scope"
                    >{{scope.row.year}}-{{scope.row.month}}-{{scope.row.day}}</template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
export default {
    name: "home",
    data: () => ({
        //页面数据声明
        show: true,
        open: false,
        queryParams: {
            v: "1.0",
            month: 10,
            day: 1,
            key: "2ab6783ef2eaab940eaf1ce28e979714",
            apiKey: "G6Rm81s2a1808f930c5f2ca7f9a166691839f922a515922",
            page: 1,
            pageSize: 10,
            totalCount: 1,
            totalPage: 1
        },
        type: "1",
        etpArr: [],
        jokeArr: [],
        todayArr: []
    }),
    created() {
        this.search(1);
    },
    mounted() {},
    methods: {
        async search(pageNum) {
            for (let key in this.queryParams) {
                if (!this.queryParams[key]) {
                    delete this.queryParams[key];
                }
            }
            let res1 = await this.$api.getCommonJokeGetJokes(this.queryParams);
            this.jokeArr = res1.result.jokes;
            this.queryParams.page = res1.result.currentPage;
            this.queryParams.totalCount = res1.result.totalCount;
            this.queryParams.totalPage = res1.result.totalPage;
            let res2 = await this.$api.getJapiToh(this.queryParams);
            this.todayArr = res2.result;
        },
        reset() {
            this.queryParams = new searchItems();
        },

        changePage(num) {
            //切换分页器
            this.queryParams.page = num;
            this.search();
        },
        changePageSize(num) {
            //切换分页器
            this.queryParams.pageSize = num;
            this.search();
        }
    }
};
</script>

<style scoped lang="less">
@import url("./home.less");
</style>
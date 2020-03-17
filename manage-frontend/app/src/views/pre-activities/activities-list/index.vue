<template>
  <div class="app-container">
    <el-card>
      <div style="margin-bottom:15px">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="search()" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <el-form :inline="true" size="small" label-width="140px">
        <el-form-item label="预约瓷器">
          <el-input v-model="searchForm.name" placeholder="瓷器名称"></el-input>
        </el-form-item>
        <el-form-item label="预约状态">
          <el-select v-model="searchForm.activityStatus" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="toEdit(0)">增加</el-button>
    </el-card>
    <div class="table-container">
      <el-card>
        <el-table :data="tableData" border>
          <el-table-column label="序号" align="center">
            <template
              slot-scope="scope"
            >{{ (searchForm.pageNum-1)*searchForm.pageSize + scope.$index +1 }}</template>
          </el-table-column>
          <el-table-column label="活动编号" align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="瓷器名称" align="center">
            <template slot-scope="scope">{{ scope.row.productName }}</template>
          </el-table-column>
          <el-table-column label="价格" align="center">
            <template slot-scope="scope">{{ scope.row.unitPrice }}</template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">{{ scope.row.count }}</template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">未上架</span>
              <span v-if="scope.row.activityStatus==0&&scope.row.status==1">活动预约中</span>
              <span v-if="scope.row.activityStatus==1&&scope.row.status==1">活动未开始</span>
              <span v-if="scope.row.activityStatus==2&&scope.row.status==1">活动已结束</span>
            </template>
          </el-table-column>
          <el-table-column label="预约开始时间" align="center">
            <template slot-scope="scope">{{ scope.row.startTime }}</template>
          </el-table-column>
          <el-table-column label="预约结束时间" align="center">
            <template slot-scope="scope">{{ scope.row.endTime }}</template>
          </el-table-column>
          <el-table-column label="上架/下架" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="handleUpdateStatus(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <zg-pagination @change="changePage" :total="total" :size="searchForm.pageSize"></zg-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import list from "@/mixins/list";
import { fetchList, updateSwitchActivities } from "@/api/preActivities";
let defaultSearchForm = {
  name: "",
  activityStatus: "",
  pageNum: 1,
  pageSize: 10
};
export default {
  mixins: [list],
  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),
      tableData: [],
      total: null,
      statusList: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 1,
          label: "未开始"
        },
        {
          value: 0,
          label: "预约中"
        },
        {
          value: 2,
          label: "已结束"
        }
      ]
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    changePage(pageNum, pageSize) {
      this.searchForm.pageNum = pageNum;
      this.searchForm.pageSize = pageSize;
      this.getData();
    },
    async getData() {
      let res = await fetchList(this.searchForm);
      if (res.code == 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    search() {
      this.getData();
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, defaultSearchForm);
    },
    toEdit(id) {
      // 进编辑页面
      if (id) {
        this.$router.push({
          path: "/pre/update",
          query: {
            type: "update",
            id: id
          }
        });
      } else {
        this.$router.push({
          path: "/pre/add",
          query: {
            type: "add"
          }
        });
      }
    },
    async switchUpdate(params) {
      console.log(params);
      let res = await updateSwitchActivities(params);
      if (res) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      }
      this.getData();
    },
    handleUpdateStatus(index, row) {
      let params = this.tableData[index];
      let text;
      if (row.status == 0) {
        text = "是否下架该商品？";
      } else {
        text = "是否上架该商品";
      }
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.switchUpdate(params);
        })
        .catch(() => {
          this.getData();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

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
        <el-form-item label="瓷人姓名">
          <el-input v-model="searchForm.userName" placeholder="瓷人姓名"></el-input>
        </el-form-item>
        <el-form-item label="瓷人等级">
          <el-select v-model="searchForm.grade" placeholder="请选择瓷人等级">
            <el-option
              v-for="item in productList"
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
      <el-button size="mini" class="btn-add" @click="addAuthor()">创建</el-button>
    </el-card>
    <div class="table-container">
      <el-card>
        <el-table :data="tableData" border>
          <el-table-column label="序号" align="center">
            <template
              slot-scope="scope"
            >{{ (searchForm.pageNum-1)*searchForm.pageSize + scope.$index +1 }}</template>
          </el-table-column>
          <el-table-column label="瓷人姓名" align="center">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column label="瓷人等级" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.grade==0">国家专家</span>
              <span v-if="scope.row.grade==1">省级专家</span>
              <span v-if="scope.row.grade==2">社会新锐</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template slot-scope="scope">{{ scope.row.updateTime }}</template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="handleUpdateStatus(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.publishStatus==0"
                size="mini"
                @click="look(scope.row.id)"
              >修改</el-button>
              <el-button size="mini" type="danger" @click="clickDeleteRow(scope.row.id)">删除</el-button>
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
import { fetchList, switchStatus, deleteAuthor } from "@/api/author";
let defaultSearchForm = {
  pageNum: 1,
  pageSize: 10,
  userName: "",
  grade: null
};
export default {
  mixins: [list],

  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),
      tableData: [],
      productList: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 0,
          label: "国家专家"
        },
        {
          value: 1,
          label: "省级专家"
        },
        {
          value: 2,
          label: "社会新锐"
        }
      ],
      total:null
    };
  },
  created() {
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
      if (res) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    addAuthor() {
      this.$router.push({
        path: "/author/authorAdd"
      });
    },
    look(id) {
      this.$router.push({
        path: "/author/authorDetail",
        query: {
          id: id,
          type: "edit"
        }
      });
    },
    async deleteRow(id) {
      let res = await deleteAuthor(id);
      if (res) {
        this.$message({
          type: "success",
          message: "成功!"
        });
        this.getData();
      }
    },
    async clickDeleteRow(id) {
      this.$confirm("是否删除该瓷人？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRow(id);
        })
    },
    async switchUpdate(row) {
      let params = {
        publishStatus: row.publishStatus
      };
      let res = await switchStatus(row.id, params);
      if (res) {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        this.$message({
          type: "error",
          message: "修改失败!"
        });
        this.getData();
      }
    },
    handleUpdateStatus(index, row) {
      let text;
      if (row.publishStatus == 0) {
        text = "是否下架该瓷人？";
      } else {
        text = "是否发布该瓷人？";
      }
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.switchUpdate(row);
        })
        .catch(() => {
          this.getData();
        });
    },
    search() {
      this.getData();
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, defaultSearchForm);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
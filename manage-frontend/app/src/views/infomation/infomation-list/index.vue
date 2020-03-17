<template>
  <div class="app-container">
    <el-card>
      <div style="margin-bottom:20px">
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
        <el-form-item label="资讯标题">
          <el-input placeholder="资讯标题" v-model="searchForm.title"></el-input>
        </el-form-item>
        <el-form-item label="资讯类型">
          <el-select v-model="searchForm.type" placeholder="请选择">
            <el-option
              v-for="item in infoList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="selectDate"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="toEdit('edit')">创建</el-button>
    </el-card>
    <div class="table-container">
      <el-card>
        <el-table :data="tableData" border>
          <el-table-column label="序号" align="center">
            <template
              slot-scope="scope"
            >{{ (searchForm.pageNum-1)*searchForm.pageSize + scope.$index +1 }}</template>
          </el-table-column>
          <el-table-column label="资讯类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type==0">行业动态</span>
              <span v-if="scope.row.type==1">行业政策</span>
              <span v-if="scope.row.type==2">大点交易</span>
            </template>
          </el-table-column>
          <el-table-column label="资讯标题" align="center">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">{{ scope.row.createTime }}</template>
          </el-table-column>
          <el-table-column label="上架/下架" align="center">
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
              <el-button size="mini" @click="toEdit('edit',scope.row.id)">修改</el-button>
              <el-button size="mini" @click="toEdit('look',scope.row.id)">查看</el-button>
              <el-button size="mini" type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
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
import { fetchList, deleteInfo, switchStatus } from "@/api/news";
let defaultSearchForm = {
  pageNum: 1,
  pageSize: 10,
  title: "",
  type: "",
  startTime: "",
  endTime: ""
};
export default {
  mixins: [list],

  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),
      selectDate: [],
      infoList: [
        {
          value: null,
          label: "全部"
        },
        {
          value: 0,
          label: "行业动态"
        },
        {
          value: 1,
          label: "行业政策"
        },
        {
          value: 2,
          label: "大点交易"
        }
      ],
      tableData: [],
      total: null
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

    search() {
      let params = this.searchForm;
      params.startTime = this.selectDate[0];
      params.endTime = this.selectDate[1];
      this.getData();
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, defaultSearchForm);
      this.selectDate = [];
    },
    toEdit(type, id) {
      let params = {
        type: type,
        id: id
      };
      if (type == "add") {
        this.$router.push({
          path: "/infomation/infoAdd",
          query: {
            type: type
          }
        });
      } else if (type == "edit") {
        this.$router.push({
          path: "/infomation/infoEdit",
          query: params
        });
      } else {
        this.$router.push({
          path: "/infomation/infoLook",
          query: params
        });
      }
    },
    async deleteNews(id) {
      let res = await deleteInfo(id);
      if (res) {
        this.$message({
          type: "success",
          message: "成功!"
        });
        this.getData();
      }
    },
    deleteRow(id) {
      this.$confirm("是否删除该条资讯？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteNews(id);
      });
    },
    async updateStatus(row) {
      let res = await switchStatus(row);
      if (res) {
        this.$message({
          type: "success",
          message: "成功!"
        });
      } else {
        this.getData();
      }
    },
    handleUpdateStatus(index, row) {
      let text;
      if (row.status == 0) {
        text = "是否下架该资讯？";
      } else {
        text = "是否发布该资讯？";
      }
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateStatus(row);
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
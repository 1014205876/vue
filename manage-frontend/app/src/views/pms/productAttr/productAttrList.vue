<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="addProductAttr()" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productAttrTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="属性名称" width="140" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="商品类型" width="140" align="center">
          <template slot-scope="scope">{{$route.query.cname}}</template>
        </el-table-column>
        <el-table-column label="属性是否可选" width="120" align="center">
          <template slot-scope="scope">{{scope.row.selectType|selectTypeFilter}}</template>
        </el-table-column>
        <el-table-column label="属性值的录入方式" width="150" align="center">
          <template slot-scope="scope">{{scope.row.inputType|inputTypeFilter}}</template>
        </el-table-column>
        <el-table-column label="可选值列表" align="center">
          <template slot-scope="scope">{{scope.row.inputList}}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">   
            <el-button size="mini"   @click="$routerLink('/pms/updateProductAttr', 'update', {id: scope.row.id})">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >确定</el-button>
    </div>
    <zg-pagination @change="getPage" :total="total" :size="listQuery.pageSize"></zg-pagination>
  </div>
</template>
<script>
import { fetchList, deleteProductAttr } from "@/api/productAttr";
import list from '@/mixins/list'

export default {
  name: "productAttrList",
    mixins: [list],
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        type: this.$route.query.type
      },
      operateType: null,
      operates: [
        {
          label: "删除",
          value: "deleteProductAttr"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.$route.query.cid, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    addProductAttr() {
      this.$router.push({
        path: "/pms/addProductAttr",
        query: { cid: this.$route.query.cid, type: this.$route.query.type }
      });
    },
    handleBatchOperate() {
      if (!this.batchStatus) {
      this.$warnMessage('请选择一条记录')
        return;
      }
      if (this.operateType !== "deleteProductAttr") {
         this.$warnMessage('请选择批量操作类型')
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      this.handleDeleteProductAttr(ids);
    },

    handleDeleteProductAttr(ids) {
      this.$confirm("是否要删除该属性", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = new URLSearchParams();
        data.append("ids", ids);
        deleteProductAttr(data).then(response => {
             this.$successMessage('删除成功')
          this.getList();
        });
      });
    },
    handleDelete(index, row) {
      let ids = [];
      ids.push(row.id);
      this.handleDeleteProductAttr(ids);
    }
  },
  filters: {
    inputTypeFilter(value) {
      if (value === 1) {
        return "从列表中选取";
      } else {
        return "手工录入";
      }
    },
    selectTypeFilter(value) {
      if (value === 1) {
        return "单选";
      } else if (value === 2) {
        return "多选";
      } else {
        return "唯一";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>



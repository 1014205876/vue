<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="addProductAttrCate()" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productAttrCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="类型名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="属性数量" width="200" align="center">
          <template slot-scope="scope">
            {{
            scope.row.attributeCount == null ? 0 : scope.row.attributeCount
            }}
          </template>
        </el-table-column>
        <el-table-column label="参数数量" width="200" align="center">
          <template slot-scope="scope">
            {{
            scope.row.paramCount == null ? 0 : scope.row.paramCount
            }}
          </template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                $routerLink('/pms/productAttrList', 'list', {
                  cid: scope.row.id,
                  cname: scope.row.name,
                  type: 0
                })
              "
            >属性列表</el-button>
            <el-button
              size="mini"
              @click="
                $routerLink('/pms/productAttrList', 'list', {
                  cid: scope.row.id,
                  cname: scope.row.name,
                  type: 1
                })
              "
            >参数列表</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <zg-pagination @change="getPage" :total="total"></zg-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form ref="productAttrCatForm" :model="productAttrCate" :rules="rules" label-width="120px">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="productAttrCate.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,productAttrCate={}">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  createProductAttrCate,
  deleteProductAttrCate,
  updateProductAttrCate
} from "@/api/productAttrCate";

import list from "@/mixins/list";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};

export default {
  name: "productAttrCateList",
  mixins: [list],
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      dialogVisible: false,
      dialogTitle: "",
      productAttrCate: {
        name: "",
        id: null
      },
      rules: {
        name: [{ required: true, message: "请输入类型名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList(fetchList, this.listQuery);
  },
  methods: {
    addProductAttrCate() {
      this.dialogVisible = true;
      this.dialogTitle = "添加类型";
    },

    handleDelete(index, row) {
      this.deleteTableData(deleteProductAttrCate, row.id, row);
    },

    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑类型";
      this.productAttrCate.name = row.name;
      this.productAttrCate.id = row.id;
    },

    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = new URLSearchParams();
          data.append("name", this.productAttrCate.name);
          if (this.dialogTitle === "添加类型") {
            createProductAttrCate(data).then(response => {
              this.$successMessage("添加成功");
              this.dialogVisible = false;
              this.productAttrCate = {};
              this.getList(fetchList, this.listQuery);
            });
          } else {
            updateProductAttrCate(this.productAttrCate.id, data).then(
              response => {
                this.$successMessage("添加成功");
                this.dialogVisible = false;
                this.productAttrCate = {};
                this.getList(fetchList, this.listQuery);
              }
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>

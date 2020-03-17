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
        <el-form-item label="配置项名称">
          <el-input v-model="searchForm.name" placeholder="配置项名称"></el-input>
        </el-form-item>
        <el-form-item label="配置项key">
          <el-input v-model="searchForm.key" placeholder="配置项key"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>应用列表</span>
      <el-button size="mini" class="btn-add" @click="dialogVisible = true,modalTitle='新增',submitForm={}">
        <i class="el-icon-plus"></i> 新增配置项
      </el-button>

      <el-dialog
        :title="modalTitle"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form
          :rules="rules"
          :model="submitForm"
          ref="submitForm"
          size="small"
          label-width="140px"
        >
          <el-form-item label="配置项名称" prop="name">
            <el-input style="width:50%" placeholder="配置项名称" v-model="submitForm.name"></el-input>
          </el-form-item>
          <el-form-item label="配置项key" prop="key">
            <el-input style="width:50%" placeholder="配置项key" v-model="submitForm.key"></el-input>
          </el-form-item>
          <el-form-item label="配置项类型" prop="type">
            <el-select v-model="submitForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="submitForm.type==1" label="配置项值" prop="value">
            <tim :isView="isView" :width="600" :height="300" v-model="submitForm.value"></tim>
          </el-form-item>
          <el-form-item v-if="submitForm.type==0" label="配置项值" prop="value">
            <multi-upload v-model="fileList"></multi-upload>
          </el-form-item>
          <el-form-item v-if="submitForm.type==2" label="配置项值" prop="value">
            <el-input style="width:50%" v-model="submitForm.value"></el-input>
          </el-form-item>
          <el-form-item v-if="submitForm.type==3" label="配置项值" prop="value">
            <el-input type="textarea" style="width:50%" v-model="submitForm.value"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="addItem('submitForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <div class="table-container">
      <el-card>
        <el-table :data="tableData" border>
          <el-table-column label="配置项名称" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="配置项（key）" align="center">
            <template slot-scope="scope">{{ scope.row.key }}</template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template slot-scope="scope">{{ scope.row.updateTime }}</template>
          </el-table-column>
          <el-table-column label="启用/禁用" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="handleUpdateStatus(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button size="mini" @click="toDetail(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <zg-pagination @change="changePage" :total="total" :size="searchForm.pageSize"></zg-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import MultiUpload from "@/components/Upload/multiUpload";
import list from "@/mixins/list";
import rules from "@/rules";

import {
  fetchList,
  addSetting,
  patchSetting,
  deleteSetting
} from "@/api/system";
let defaultSearchForm = {
  pageNum: 1,
  pageSize: 10,
  title: "",
  key: "",
  name: ""
};
export default {
  mixins: [list],
  components: { tim: Tinymce, MultiUpload },

  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),
      fileList: "",
      isView: false,
      dialogVisible: false,
      tableData: [],
      submitForm: {
        id: null,
        value: "",
        name: null,
        key: "",
        type: null,
        status: 1
      },
      typeList: [
        {
          value: 0,
          label: "图片"
        },
        {
          value: 1,
          label: "富文本"
        },
        {
          value: 2,
          label: "单行文本框"
        },
        {
          value: 3,
          label: "多行文本框"
        }
      ],
      total: null,
      rules: {
        name: [rules.required("请输入配置项名称"), rules.len(2, 140)],
        key: [rules.required("请输入配置项key")],
        type: [rules.required("请选择配置项类型")],
        value: [rules.required("请输入配置项值")]
      },
      modalTitle: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await fetchList(this.searchForm);
      if (res) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    async deleteRows(id) {
      let res = await deleteSetting(id);
      if (res) {
        this.$message({
          type: "success",
          message: "成功!"
        });
        this.getData();
      }
    },
    deleteItem(id) {
      this.$confirm("是否删除该配置项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteRows(id);
      });
    },
    search() {
      this.getData();
    },
    handleResetSearch() {
      this.searchForm = Object.assign({}, defaultSearchForm);
    },
    async add() {
      if (this.submitForm.id) {
        let res = await patchSetting(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.dialogVisible = false;
          this.getData();
          this.submitForm = {};
          this.fileList = "";
        }
      } else {
        let res = await addSetting(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.dialogVisible = false;
          this.getData();
          this.submitForm = {};
          this.fileList = "";
        }
      }
    },
    addItem(formName) {
      if (this.submitForm.type == 0) {
        this.submitForm.value = this.fileList;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.add();
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },
    toDetail(row) {
      this.modalTitle = "编辑";
      this.submitForm = row;
      this.submitForm.type = this.submitForm.type - 0;
      if (this.submitForm.type == 0) {
        this.fileList = this.submitForm.value;
      }
      this.dialogVisible = true;
    },
    handleClose() {
      this.submitForm = {};
      this.fetchList = "";
      this.dialogVisible = false;
    },
    changePage(pageNum, pageSize) {
      this.searchForm.pageNum = pageNum;
      this.searchForm.pageSize = pageSize;
      this.getData();
    },
    async patchStatus(row) {
      let res = await patchSetting(row);
      if (res) {
        this.$message({
          type: "success",
          message: "成功!"
        });
      }
      this.getData();
    },
    handleUpdateStatus(index, row) {
      let text;
      if (row.status == 0) {
        text = "是否禁用该配置项？";
      } else {
        text = "是否启用该配置项？";
      }
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.patchStatus(row);
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
<template>
  <div class="app-container">
    <el-card>
      <div style="margin-bottom:15px">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="getData" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch"
          size="small"
        >重置</el-button>
      </div>
      <el-form :inline="true" size="small" label-width="140px">
        <el-form-item label="问题标题">
          <el-input v-model="searchForm.title" placeholder="请输入问题标题"></el-input>
        </el-form-item>
        <el-form-item label="问题分组">
          <el-select v-model="searchForm.group" placeholder="请选择问题分组">
            <el-option label="所有" value></el-option>
            <el-option
              v-for="item in groupList"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>帮助问题列表</span>
      <el-button size="mini" class="btn-add" @click="addHelp">
        <i class="el-icon-plus"></i> 新增帮助
      </el-button>

      <el-dialog
        :title="submitForm.name"
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
          <el-form-item label="问题标题">
            <el-input style="width:50%" placeholder="请输入问题标题" v-model="submitForm.title"></el-input>
          </el-form-item>
          <el-form-item label="所属分组">
            <el-select v-model="submitForm.group" placeholder="请选择">
              <el-option
                v-for="item in groupList"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="dialogVisible" label="回答">
            <tim :width="600" :height="300" :isView="false" v-model="submitForm.answer"></tim>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="addItem">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <div class="table-container">
      <el-card>
        <el-table :data="tableData" border>
          <el-table-column label="问题标题" align="center">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="分组" align="center">
            <template slot-scope="scope">{{ scope.row.group }}</template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template slot-scope="scope">{{ scope.row.updateDate }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button size="mini" @click="toDetail(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <zg-pagination @change="changePage" :total="searchForm.total" :size="searchForm.pageSize"></zg-pagination>
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
  getHelpGrid,
  postHelp,
  putHelpModifyId,
  deleteHelp
} from "@/api/system";
let defaultSearchForm = {
  pageNum: 1,
  pageSize: 10,
  title: "",
  group: "",
  total: 1,
  totalPage: 1
};
export default {
  mixins: [list],
  components: { tim: Tinymce, MultiUpload },

  data() {
    return {
      searchForm: Object.assign({}, defaultSearchForm),//分页查询
      groupList: [//帮助分组
        {
          value: 0,
          label: "购买流程"
        },
        {
          value: 1,
          label: "支付方式"
        },
        {
          value: 2,
          label: "配送方式"
        },
        {
          value: 3,
          label: "售后服务"
        },
        {
          value: 4,
          label: "其他"
        }
      ],
      dialogVisible: false,//弹窗的显示隐藏
      tableData: [],
      submitForm: {//弹窗表单
        id: null,
        title: "",
        group: null,
        answer: ""
      },
      rules: {//表单校验
        title: [rules.required("请输入问题标题")],
        group: [rules.required("请选择分组")],
        answer: [rules.required("请输入回答")]
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      //查询帮助列表
      let res = await getHelpGrid(this.searchForm);
      if (res) {
        this.tableData = res.data.list;
        this.searchForm.total = res.data.total;
      }
    },
    async deleteRows(id) {
      //删除单条帮助
      let res = await deleteHelp(id);
      if (res) {
        this.$message({
          type: "success",
          message: "成功!"
        });
        this.getData();
      }
    },
    deleteItem(id) {
      //删除的提示弹窗
      this.$confirm("是否删除该帮助？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRows(id);
        })
    },
    handleResetSearch() {//重置搜索框
      this.searchForm = Object.assign({}, defaultSearchForm);
    },
    async addItem() {
      //点击确定
      if (this.submitForm.id) {
        let res = await putHelpModifyId(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.dialogVisible = false;
          this.getData();
        }
      } else {
        let res = await postHelp(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.dialogVisible = false;
          this.getData();
        }
      }
    },
    addHelp() {
      //新增帮助
      this.submitForm = {};
      this.submitForm.name = "新增";
      this.dialogVisible = true;
    },
    toDetail(row) {
      //编辑帮助
      this.submitForm = row;
      this.submitForm.name = "编辑";
      this.dialogVisible = true;
    },
    handleClose() {
      //关闭弹窗
      this.dialogVisible = false;
    },
    changePage(pageNum, pageSize) {
      //分页切换
      this.searchForm.pageNum = pageNum;
      this.searchForm.pageSize = pageSize;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
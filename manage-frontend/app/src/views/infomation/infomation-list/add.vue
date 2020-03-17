<template>
  <div class="app-container">
    <el-card>
      <el-form class="form-box" size="small" label-width="140px">
        <el-form-item label="资讯类型">
          <el-select v-model="submitForm.type" placeholder="请选择资讯类型">
            <el-option
              v-for="item in productList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯标题">
          <el-input v-model="submitForm.title"></el-input>
        </el-form-item>
        <el-form-item label="资讯图片" v-if="submitForm.type!=1">
          <multi-upload v-model="fileList"></multi-upload>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="tim-card">
      <tim :isView="isView" :width="800" :height="300" v-model="submitForm.detail"></tim>

      <div class="btn-box">
        <el-button class="btn" v-if="pageType!='look'" @click="handleCancle()">取消</el-button>
        <el-button class="btn" v-if="pageType!='look'" type="primary" @click="handleSubmit()">确定</el-button>
        <el-button class="btn" v-if="pageType=='look'" @click="handleCancle()">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import MultiUpload from "@/components/Upload/multiUpload";

import { getSingleInfo, addInfo, putInfo } from "@/api/news";

export default {
  name: "ProductAttrDetail",
  data() {
    return {
      isView: false,
      pageType: "",
      productList: [
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
      selectValue: "",
      submitForm: {
        id: "",
        title: "",
        type: null,
        picUrl: "",
        detail: ""
      },
      fileList: ""
    };
  },
  components: { tim: Tinymce, MultiUpload },
  created() {
    let id = this.$route.query.id;
    this.pageType = this.$route.query.type;
    if (id) {
      this.getSingleData(id);
    }
  },
  methods: {
    async handleSubmit() {
      this.submitForm.picUrl = this.fileList;
      if (this.submitForm.id) {
        let res = await putInfo(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push({
            path: "/infomation/infoList"
          });
        }
      } else {
        let res = await addInfo(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.$router.push({
            path: "/infomation/infoList"
          });
        }
      }
    },
    async getSingleData(id) {
      let res = await getSingleInfo(id);
      if (res) {
        this.submitForm = res.data;
        this.fileList = res.data.picUrl;
      }
    },
    handleCancle() {
      this.$router.push({
        path: "/infomation/infoList"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-box {
  width: 50%;
}
.tim-card {
  margin-top: 20px;
  padding-left: 70px;
  .btn-box {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-left: 300px;
  }
}
</style>
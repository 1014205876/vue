<template>
  <div class="app-container">
    <el-card>
      <el-form class="form-box" size="small" label-width="140px">
        <el-form-item label="瓷人姓名">
          <el-input v-model="submitForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="瓷人等级">
          <el-select v-model="submitForm.grade" placeholder="请选择资讯类型">
            <el-option
              v-for="item in productList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="瓷人简介">
          <el-input type="textarea" v-model="submitForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="瓷人照片">
          <multi-upload v-model="fileList"></multi-upload>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="tim-card">
      <tim :isView="isView" :width="800" :height="300" v-model="submitForm.detail"></tim>
      <div class="btn-box">
        <el-button class="btn" @click="handleCancle()">取消</el-button>
        <el-button class="btn" type="primary" @click="handleSubmit()">确定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { getSingleAuthor, addAuthor, putAuthorInfo } from "@/api/author";
import MultiUpload from "@/components/Upload/multiUpload";

export default {
  data() {
    return {
      fileList: "",
      isView: false,
      productList: [
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
      submitForm: {
        id: null,
        userName: "",
        grade: null,
        introduction: "",
        pic: "1",
        detail: ""
      }
    };
  },
  components: { tim: Tinymce, MultiUpload },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getAuthorData(id);
    }
  },
  methods: {
    async getAuthorData(id) {
      let res = await getSingleAuthor(id);
      if (res) {
        this.submitForm = res.data;
        this.fileList = res.data.pic;
      }
    },
    handleCancle() {
      this.$router.push({
        path: "/author/authorList"
      });
    },
    async handleSubmit() {
      this.submitForm.pic = this.fileList;
      if (this.submitForm.id) {
        let res = await putAuthorInfo(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push({
            path: "/author/authorList"
          });
        }
      } else {
        let res = await addAuthor(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/author/authorList"
            });
          }, 500);
        }
      }
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
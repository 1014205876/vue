<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>预约信息</span>
      </div>
      <div>
        <el-form class="form-box" size="small" label-width="140px">
          <el-form-item label="选择商品">
            <el-select
              filterable
              @change="selectChange"
              v-model="submitForm.productId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动选择图">
            <multi-upload :limit="2" v-model="fileList"></multi-upload>
          </el-form-item>
          <el-form-item label="预约单价">
            <el-input-number
              v-show="true"
              v-model="submitForm.unitPrice"
              controls-position="right"
              :min="0"
              size="large"
            ></el-input-number>
            <span>元</span>
          </el-form-item>
          <el-form-item label="预约数量">
            <el-input-number
              v-show="true"
              v-model="submitForm.count"
              :min="0"
              controls-position="right"
              size="large"
            ></el-input-number>
            <!-- <span style="margin-left: 50px">库存剩余：{{stock}}件/套</span> -->
          </el-form-item>
          <el-form-item label="每人限购">
            <el-input-number
              v-show="true"
              v-model="submitForm.limit"
              controls-position="right"
              :min="1"
              :max="submitForm.count"
              size="large"
            ></el-input-number>
            <span style="margin-left: 50px">限购数量不得超过{{submitForm.count}}件/套</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span>预约时间</span>
      </div>
      <div>
        <el-form class="form-box" size="small" label-width="140px">
          <el-form-item label="预约时间">
            <el-date-picker
              v-model="selectDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00']"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-box">
        <el-button class="btn" type="default" @click="back()" size="medium">取消</el-button>
        <el-button class="btn" type="primary" size="medium" @click="submit()">完成</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import MultiUpload from "@/components/Upload/multiUpload";
import { fetchList } from "@/api/product";
import {
  addActivities,
  idGetActivities,
  updateActivities
} from "@/api/preActivities";
let searchForm = {
  pageNum: 1,
  pageSize: 1000
};
export default {
  components: { MultiUpload },

  data() {
    return {
      fileList: "",
      selectDate: [],
      productList: [],
      selectValue: "",
      submitForm: {
        id: "",
        productId: null,
        pic: null,
        unitPrice: null,
        count: null,
        limit: null,
        startTime: "",
        endTime: "",
        createTime: "",
        status: 0
      },
      stock: 1099999
    };
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getFileList(id);
    }
    this.getProductList();
  },
  methods: {
    async getFileList(id) {
      let res = await idGetActivities(id);
      if (res.code == 200) {
        this.submitForm = res.data;
        this.selectDate = [res.data.startTime, res.data.endTime];
        this.fileList = res.data.pic;
        this.show = true;
        console.log(this.submitForm.count)
      }
    },
    async getProductList() {
      let res = await fetchList(searchForm);
      this.productList = res.data.list;
      this.selectChange();
    },
    selectChange() {
      this.productList.map(item => {
        if (item.id == this.submitForm.productId) {
          this.stock = item.stock - 0;
        }
      });
    },
    async submit(id) {
      // 由于前端input 永远是字符串
      this.submitForm.startTime = this.selectDate[0];
      this.submitForm.endTime = this.selectDate[1];
      this.submitForm.unitPrice = this.submitForm.unitPrice - 0;
      this.submitForm.count = this.submitForm.count - 0;
      this.submitForm.limit = this.submitForm.limit - 0;
      this.submitForm.pic = this.fileList;
      if (this.submitForm.id) {
        let res = await updateActivities(this.submitForm);
        if (res) {
          if (res) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.$router.push({
              path: "/pre/activities"
            });
          }
        }
      } else {
        let res = await addActivities(this.submitForm);
        if (res) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.$router.push({
            path: "/pre/activities"
          });
        }
      }
    },
    back() {
      this.$router.push({
        path: "/pre/activities"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-box {
  width: 100%;
}
.btn-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .btn {
    margin: 10px 20px;
  }
}
</style>
<template>
  <div class="mengban" v-bind:class='{show:show}'>
      <div class="alert" :style='{height:list?"3.7rem":"2.8rem"}'>
        <div class="main" :style='{height:list?"1rem":"2rem"}'>{{remind}}</div>
        <div class='form' v-if='list'>
          <textarea class='' rows="3" :placeholder='list.placeholder?list.placeholder:"请输入"' v-model='list.value'></textarea>
        </div>
        <div class="btn">
          <div class="left" v-if='left' v-on:click='btn("left",left,index)' :style='{color:leftColor}'>{{left}}</div>
          <div class="right" v-if='right' v-on:click='btn("right",right,index)' :style='{color:rightColor}'>{{right}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Alert",
  props: ['list',"index", "remind", "left", "leftColor", "right", "rightColor"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    btn(choice, name, index) {
      this.$emit("choice", { data: choice, name: name, index: index });
    },
    alertshow() {
      this.show = true;
    },
    alertclose() {
      this.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.mengban {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  transform: scale3d(0, 0, 0);
  .alert {
    width: 4.2rem;
    height: 2.8rem;
    border-radius: 0.2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    text-align: center;
    font-size: 0.3rem;
    transition: all 0.2s;
    -webkit-transition: all 0.2s; /* Safari */
    transform: scale3d(0, 0, 0);
    .main {
      width: 100%;
      height: 2rem;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .form{
      padding:0 0.3rem;
      textarea{
        -moz-box-sizing: border-box;
        /*Firefox3.5+*/
        -webkit-box-sizing: border-box;
        /*Safari3.2+*/
        -o-box-sizing: border-box;
        /*Opera9.6*/
        -ms-box-sizing: border-box;
        /*IE8*/
        width:100%;
        border:1px solid #D5D5D5;
        border-radius:0.1rem;
        font-size:0.28rem;
        line-height:0.46rem;
        padding:0.1rem;
      }
    }
    .btn {
      position: absolute;
      bottom: 0;
      display: flex;
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      div {
        flex: 1;
        border-top: 1px solid #cacaca;
        border-left: 1px solid #cacaca;
      }
      div:first-child {
        border-left: 0px solid transparent;
      }
      .left {
        color: #333333;
      }
      .right {
        color: #3674b2;
      }
    }
  }
}
.mengban.show {
  transform: scale3d(1, 1, 1);
  .alert {
    transform: scale3d(1, 1, 1);
  }
}
</style>

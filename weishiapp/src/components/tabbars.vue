<template>
  <div class="tabbar">
    <van-tabbar v-model="onActive" class="active_tab">
      <van-tabbar-item
        v-for="(item,index) in tabbars"
        :key="index"
        :name="item.name" 
        :icon="item.icon"
        :to='item.url'
      >
      {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop() private active!: string;
  private onActive=this.active
  private tabbars=[
    {
      name: "home",
      title: "首页",
    },
    {
      name: "category",
      title: "频道",
    },
    {
      name: "mine",
      title: "消息",
    },
    {
      name: "mine",
      title: "我",
    }
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>

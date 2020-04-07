<template>
  <div class="home">
    <div class="focus-top">
      <van-row>
        <van-col span="4" class="focus">关注</van-col>
        <van-col span="4" class="comment">推荐</van-col>
        <van-col span="12" class="scroll">
          <div class="con" style="position:relative">
            <img src="@/assets/top.png" width="142px" height="35px">
            <div>
            <marquee direction="left" scrollamount="5">共建种花家的云创视频</marquee>
            </div>
          </div>
        </van-col>
      
        <van-col span="4" class="search"><van-icon name="search"></van-icon></van-col>
      </van-row>
    </div>
    <van-swipe style="height: 93vh;" vertical show-indicators  @change="onChange">
      <van-swipe-item>
        <div class="main">
          <video  style="object-fit: fill;width:100%;height:100%;" autoplay loop="loop" ref="myvideo" x5-video-player-type="h5-page">
              <source src="@/assets/my.mp4" type="video/mp4" />
          </video>
          
          
          <div class="favourite-right">
            <van-row>
              <van-col span="24" class="avt"><img src="@/assets/avt.jpeg" alt="" width="50" height="50"></van-col>
              <van-col span="24"><img src="@/assets/hart.png" alt="" width="35" height="35"><br>9.4万</van-col>
              <van-col span="24"><img src="@/assets/commit.png" alt=""  width="35" height="35"><br>1560</van-col>
              <van-col span="24"><img src="@/assets/tag.png" alt=""  width="35" height="35"><br>1560</van-col>
              <van-col span="24"><img src="@/assets/zf.png" alt=""  width="35" height="35"><br>1560</van-col>
              
            </van-row>
          </div>
          <div class="wrap">
            <div class="news-bottom">
              <van-row>
                <van-col span="24">@共建种花家</van-col>
                <van-col span="24">懂得担当的孩子，我们大家值得去帮助</van-col>
                <van-col span="24"><img src="@/assets/mus.png" alt="" class="mus"><marquee direction="left" width="50%" scrollamount="5">共建种花家的云创视频</marquee></van-col>
                
              </van-row>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="main" @click="goToUrl">
          <video style="object-fit: fill;width:100%;height:100%;" autoplay loop="loop" ref="qpvideo" x5-video-player-type="h5-page">
            <source src="@/assets/normal.mp4" type="video/mp4" />
          </video>
          <!-- <div class="focus-top">
            <van-row>
              <van-col span="4" class="focus">关注</van-col>
              <van-col span="4" class="comment">推荐</van-col>
              <van-col span="12" class="scroll">
                <div class="con" style="position:relative">
                  <img src="@/assets/top.png" width="142px" height="35px">
                  <div>
                  <marquee direction="left" scrollamount="5">共建种花家的云创视频</marquee>
                  </div>
                </div>
              </van-col>
              <van-col span="4" class="search"><van-icon name="search"></van-icon></van-col>
            </van-row>
          </div> -->
          
          <div class="favourite-right">
            <van-row>
              <van-col span="24" class="avt1">棋牌</van-col>
              <van-col span="24"><img src="@/assets/hart.png" alt="" width="35" height="35"><br>9.4万</van-col>
              <van-col span="24"><img src="@/assets/commit.png" alt=""  width="35" height="35"><br>1560</van-col>
              <van-col span="24"><img src="@/assets/tag.png" alt=""  width="35" height="35"><br>1560</van-col>
              <van-col span="24"><img src="@/assets/zf.png" alt=""  width="35" height="35"><br>1560</van-col>
            </van-row>
          </div>
          <div class="wrap">
            <div class="news-bottom">
              <van-row>
                <van-col span="24" style="font-size:24px">@恒盛棋牌</van-col>
                <van-col span="24" style="margin-bottom:15px">火爆棋牌注册找客户可领彩金</van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <img src="@/assets/btn.png" alt="" style="height:7vh;width:100%">
    <!-- <van-tabbar v-model="onActive" class="active_tab" style="height:7vh;background:#19191c;border-width:0">
      <van-tabbar-item
        v-for="(item,index) in tabbars"
        :key="index"
        :name="item.name" 
        :icon="item.icon"
        :to='item.url'
      >
      {{item.title}}
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
 
  private onActive=""
  private goToUrl(){
    window.top.postMessage("http://www.hsqp66.com","*")
  }
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
  private swipeDown(){
    this.$router.push({name:"About"})
  }
  private onChange(index:any){
    let myvideo:any=this.$refs.myvideo
    let qpvideo:any=this.$refs.qpvideo
    if(index===0){
      myvideo.play()
    }else{
       myvideo.pause()
    }
    if(index===1){
      qpvideo.play()
    }else{
      qpvideo.pause()
    }
    
  }
}
</script>
<style lang="stylus">
.main
  position relative
  height 93vh

.favourite-right,
.news-bottom
  position absolute
  color #fff
 .wrap
    width 100%
    height 200px
    background -webkit-gradient(linear, 0 0, 0 bottom, from(transparent), to(#000))
    margin-top -200px
    position relative
    z-index 1 
.focus-top
  position fixed
  z-index 999
  top 0
  width 100%
  height 40px
  color #fff
.favourite-right
  right 0
  bottom 20%
  width 60px
  text-align center
  font-size 10px
.favourite-right .van-col
  margin-bottom 10px
.favourite-right .van-icon
  font-size 30px
  margin-bottom 5px
.news-bottom
  bottom 0
  left 16.5px
  font-size 12px
.news-bottom .van-col
  margin-bottom 5px
.focus-top .focus
  font-size 12px
  padding-top 17px
  padding-left 14px
.focus-top .comment
  font-size 18.5px
  padding-top 8px
  font-weight 600
.focus-top .search
  text-align center
  padding-top 8px
.focus-top .search .van-icon
  font-size 30px
.van-tabbar .van-tabbar-item__text
  color #fff
[class*=van-hairline]::after
  border-color #19191c!important
.avt img
  border-radius 50%
.mus
  width 25px
  height 25px
  margin-left -10px
  vertical-align -5px
.scroll
  margin-top 5px
  text-align right 
.scroll .con
  width 142px
  height 35px
  float right
.scroll .con>div
  margin-top:5px
  color:#ffecbd
  position absolute
  left 35px
  top 0px
  width 45%
.avt1
  width 55px!important
  height 55px
  line-height 55px
  text-align center
  font-size 18px
  border-radius 50% 
  background #3f9dee
.van-swipe__indicators
  display none!important
</style>

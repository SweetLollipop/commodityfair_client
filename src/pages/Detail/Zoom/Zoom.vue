<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg"/>
    </div>
    <!-- 遮罩层:青色的 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return{
      i: 0,
    }
  },
  props: ["skuImgList"],
  computed: {
    //为了防止服务器返回数据缓慢undefined,加上空对象
    imgObj() {
      return this.skuImgList[this.i] || {};
    }
  },
  mounted() {
    //全局事件总线，获取兄弟组件传递过来的索引值
    this.$bus.$on('getIndex',(index)=> {
      this.i = index;
    })
  },
  methods: {
    handler(event) {
      let mask = this.$refs.mask;
      let bigImg = this.$refs.bigImg;
      //计算间距
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //约束范围
      if(left < 0) left = 0;
      if(left > mask.offsetWidth) left = mask.offsetWidth;
      if(top < 0) top = 0;
      if(top > mask.offsetHeight) top = mask.offsetHeight;
      //修改元素的left和top的属性值
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';
      //修改大图的left和top(bigImg图的img是普通图的2倍且展示的方位与普通图方位相反所以 *-2)
      bigImg.style.left = -2 * left + 'px';
      bigImg.style.top = -2 * top + 'px';
    }
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
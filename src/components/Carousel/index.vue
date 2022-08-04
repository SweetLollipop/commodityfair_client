<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carouselList, index) in list"
        :key="carouselList.id"
      >
        <img :src="carouselList.imgUrl" />
      </div>
      <!-- <div class="swiper-slide">
                    <img src="./images/floor-1-b02.png" />
                  </div>
                  <div class="swiper-slide">
                    <img src="./images/floor-1-b03.png" />
                  </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引人Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //立即监听：不管你数据有没有变化，我上来立即监听一次
      //为什么watch监听不到list：因为这个数据从来没有变化（数据是父组件给的，从来没有变化）
      immediate: true,
      handler() {
        //只能监听到数据已经有了，还不能确定v-for是否动态渲染结构是否完成，因此还是需要用nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, //点击小球的时候也切换轮播图
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            /* scrollbar: {
            el: '.swiper-scrollbar',
            }, */
          });
        });
      },
    },
  },
};
</script>

<style>
</style>
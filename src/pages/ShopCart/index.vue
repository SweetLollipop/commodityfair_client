<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value-cart.skuNum,cart)" oninput="value=value.replace(/[^0-9]/g,'')">
            <a href="javascript:void(0)" class="plus" @click="handler('add',+1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          :disabled="cartInfoList.length == 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" @click="$router.push('/trade')">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
 //引入方式：是把lodash全部功能函数引入
 // import _ from 'lodash';
 //按需引入：把lodash中的throttle引入；因为throttle.js中是默认暴露，所以不加{}
 import throttle from "lodash/throttle";
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData();
    },
    methods: {
      //获取个人购物车数据
      getData() {
        this.$store.dispatch('getCartList');
      },
      //修改某个产品的个数(节流)
      handler: throttle(async function(type, disNum, cart) {
        //type:为了区分这三个元素
        //disNum形参：+ 变化量
        //cart:那个产品（身上有ID）
        //向服务器发请求，修改数量
        switch(type) {
          case "add":
            disNum = 1;
            break;
          case "minus":
            disNum = cart.skuNum > 1 ? -1 : 0;
            break;
          case "change":
            disNum = disNum;
        }
        // console.log(disNum);
        //派发action
        try {
        await this.$store.dispatch('AddOrUpdateShopCart', {skuId:cart.skuId, skuNum:disNum})
        //再次刷新获取数据
        this.getData();
        } catch (error) {
          
        }
      },500),
      //删除某个产品
      async deleteCartById(cart) {
        try {
          //删除成功
          await this.$store.dispatch('deleteCartById', cart.skuId);
          this.getData();
        } catch (error) {
          
        }
      },
      //修改某个产品的状态
      updateChecked(cart,event) {
        //带给服务器的参数isChecked，不是布尔值，应该是0,1
        try {
          let isChecked = event.target.checked ? "1" : "0";
          this.$store.dispatch('updateCheckedById', {skuId: cart.skuId, isChecked});
          //如果修改成功，需再次获取服务器数据（购物车）
          //延迟函数，$nextTick()方法此处无效
          setTimeout(() => {
            this.getData();
          }, 50);
        } catch (error) {
          //如果失败提示
          alert(error.message);
        }
      },
      //删除全部选中的产品
      //这个回调函数咱们没有办法收集到一些有用的数据
      async deleteAllCheckedCart() {
        try {
          //派发一个action
          this.$store.dispatch("deleteAllCheckedCart");
          //延迟函数，$nextTick()方法此处无效
          setTimeout(() => {
            this.getData();
          }, 100);
        } catch (error) {
          //如果失败提示
          alert(error.message);
        }
      },
      //修改全部产品的选中状态
      async updateAllCartChecked(event) {
        try {
          let isChecked = event.target.checked ? "1" : "0"
          //派发action
          await this.$store.dispatch("updateAllCartIsChecked", isChecked);
          //延迟函数，$nextTick()方法此处无效
          setTimeout(() => {
            this.getData();
          }, 50);
        } catch (error) {
          //如果失败提示
          alert(error.message);
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList() {
        return this.cartList.cartInfoList || [];
      },
      //计算购买产品的总价
      totalPrice() {
        let sum = 0;
        this.cartInfoList.forEach(item => {
          sum += item.skuNum * item.skuPrice;
        });
        return sum;
      },
      //判断底部复选框是否勾选【全部产品都选中，才勾选】
      isAllCheck() {
        //遍历数组里面原理，只要全部元素isChecked属性都为1 则返回 true  否则返回  false
        return this.cartInfoList.every(item => item.isChecked==1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
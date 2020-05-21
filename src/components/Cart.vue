<template>
  <div id="cart">
    <div class="cart_content">

      <div class="cart_head" v-if="totalNum">
        <h2>购物车</h2>
        <div class="cart_head_p">
          <div class="cart_head_p_l">
            <p>用餐人数:{{peopleInfo.p_num}}人</p>
            <p>备注:<span v-if="!peopleInfo.p_mark">无</span><span v-if="peopleInfo.p_mark">{{peopleInfo.p_mark}}</span></p>
          </div>
          <div class="cart_head_p_r">
            <router-link to='/editPeople'>
              <img src="../assets/images/edit.png" alt="">
              <p>修改</p>
            </router-link>

          </div>

        </div>

        <div class="cart_head_c">
          <p>购物车中总共有{{totalNum}}个菜</p>
          <p>合计: <span class="price">¥{{totalPrice}}</span></p>
        </div>
      </div>

      <div class="cart_list" v-if="totalNum">
        <ul class="item_list clearfix">
          <li v-for="(item,index) in list">
            <div class="left_food">
              <img class="item_img" :src="api+item.img_url" />
              <div class="inner">
                <h3 class="title">{{item.title}}</h3>
                <p class="price">¥{{item.price}}</p>
              </div>
            </div>
            <div class="cart_num">
              <div class="input_left" @click="reduceCount(index)">-</div>
              <div class="input_center">
                <input type="text" readonly="readonly" :value="item.num" name="num" id="num" />
              </div>
              <div class="input_right" @click="addCount(index)">+</div>
            </div>

          </li>
        </ul>
      </div>


      <div class="cart_foot">
        <h3>本店顾客最长点的菜</h3>
        <div class="item_list_outer">
          <ul class="item_list">
            <li>
              <div class="inner">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">

                <img src="../assets/images/1.jpg" alt="">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="cart_empty" v-if="!totalNum">
        <h3>购物车空空的</h3>
        <p>您可以点击下面的菜单开始点菜</p>
      </div>


      <k-navfooter></k-navfooter>

      <div id="footer_book" class="footer_book">
        <router-link to="/home">
          <img src="../assets/images/menu.png" />
          <p>菜单</p>
        </router-link>

      </div>

      <div id="footer_cart" class="footer_cart" @click="addOrder()">
        <img src="../assets/images/doorder.png" />
        <p>下单</p>
      </div>
    </div>
  </div>
</template>

<script>
  import NavFooter from "./public/NavFooter.vue";
  import Config from "../model/config.js";
  import storage from "../model/storage.js";

  export default {
    data() {
      return {
        api: Config.api,
        list: [],
        peopleInfo: {},
        totalNum: 0,
        totalPrice: 0
      }
    },
    sockets: {
      addcart: function() {
        this.requestCartList();
      }
    },
    methods: {
      requestCartList() {
        var roomid = storage.get('roomid');
        var api = this.api + 'api/cartlist?uid=' + roomid;
        this.$http.get(api).then(response => {
          this.list = response.body.result;
          console.log(response);
          this.calcuTotal();
        }, error => {
          // error callback
          console.log(error);
        });
      },
      calcuTotal() {
        var totalNum = 0;
        var totalPrice = 0;
        for (let item of this.list) {
          totalNum += item.num;
          totalPrice += (item.num * parseFloat(item.price));
        }
        this.totalNum = totalNum;
        this.totalPrice = totalPrice;
      },
      addCount(index) {
        var roomid = storage.get('roomid');
        var api = this.api + 'api/incCart?uid=' + roomid + '&product_id=' + this.list[index].product_id + "&num=" +
          this.list[
            index].num;
        this.$http.get(api).then(response => {
          this.$socket.emit('addcart', 'addcart');
          console.log(response);
        }, error => {
          // error callback
          console.log(error);
        });
        ++this.list[index].num;
        this.calcuTotal();
      },
      reduceCount(index) {
        var roomid = storage.get('roomid');
        var api = this.api + 'api/decCart?uid=' + roomid + '&product_id=' + this.list[index].product_id + "&num=" +
          this.list[
            index].num;
        this.$http.get(api).then(response => {
          this.$socket.emit('addcart', 'addcart');
          console.log(response);
        }, error => {
          // error callback
          console.log(error);
        });
        if (this.list[index].num == 1) {
          this.list.splice(index, 1);
        } else {
          --this.list[index].num;
        }
        this.calcuTotal();
      },
      requestPeopleInfo() {
        var roomid = storage.get('roomid');
        var api = this.api + 'api/peopleInfoList?uid=' + roomid;
        this.$http.get(api).then(response => {
          console.log(response);
          if (response.body.result.length > 0) {
            this.peopleInfo = response.body.result[0];
            console.log(this.peopleInfo.p_mark);
          }
        }, error => {
          // error callback
          console.log(error);
        });
      },
      addOrder() {
        var roomid = storage.get('roomid');
        var api = this.api + "api/addOrder";
        this.$http.post(api, {
          uid: roomid,
          p_num: this.peopleInfo.p_num,
          p_mark: this.peopleInfo.p_mark,
          order: JSON.stringify(this.list),
          total_price: this.totalPrice,
          total_num: this.totalNum,
        }).then(response => {
          console.log(response);
          if (response.body.success) {
            this.$router.push({
              path: 'order'
            });
          }else{
            alert('提交数据有误');
          }
          // this.content = response.body.result[0];
        }, response => {
          // error callback
          console.log(response);
        });
      }
    },
    mounted() {
      this.requestCartList();
      this.requestPeopleInfo();
    },
    components: {
      "k-navfooter": NavFooter
    }
  }
</script>

<style lang="scss">
  .cart_content {
    border-radius: .5rem;
    padding: .5rem;

    .cart_head {
      background: #fff;

      h2 {
        text-align: center;
        font-size: 1.8rem;
        padding: .8rem 0;
        border-bottom: 1px solid #eee;
      }

      .cart_head_p {
        display: flex;
        padding: .5rem 0;
        border-bottom: 1px solid #eee;

        .cart_head_p_l {
          flex: 1;

          p {
            line-height: 2rem;

            &:first-child {
              color: red;
            }
          }
        }

        .cart_head_p_r {
          width: 4rem;
          height: 4rem;
          text-align: center;

          img {
            width: 1.8rem;
            height: 1.8rem;
            margin: 0 auto;
          }

          a {
            color: #555;
          }
        }
      }


      .cart_head_c {
        border-bottom: 1px solid #eee;

        p {
          line-height: 2rem;

          .price {
            color: red;
            font-size: 2.4rem;
          }
        }
      }
    }


    .cart_list {
      background-color: #fff;
      padding: .5rem;
      margin-top: 1rem;
      border-radius: .5rem;

      .item_list {
        width: 100%;

        li {
          display: flex;
          border-bottom: 1px solid #eee;
          padding: 1rem 0;

          .left_food {
            flex: 1;
            display: flex;

            img {
              width: 4rem;
              height: 4rem;
              border-radius: 10%;
              margin-right: .8rem;
            }

            .inner {
              flex: 1;
            }
          }

          .cart_num {
            width: 10rem;
            display: flex;

            .input_left,
            .input_right {
              flex: 1;
              width: 2.8rem;
              height: 2.8rem;
              line-height: 2.8rem;
              text-align: center;
              color: red;
              border: 1px solid #eee;
              font-size: 2.4rem;
            }

            .input_center {
              flex: 1;

              input {
                width: 2rem;
                text-align: center;
                width: 100%;
                height: 2.8rem;
                border: none;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                float: left;
              }
            }
          }
        }
      }

    }

    .cart_foot {
      background-color: #fff;
      margin-top: 1rem;
      border-radius: .5rem;
      margin-bottom: 4rem;

      h3 {
        font-size: 1.4rem;
        padding: .5rem 0;
      }

      .item_list_outer {
        width: 100%;
        overflow-x: auto;

        .item_list {
          width: 50rem;
          padding: 0 .5rem;

          li {
            width: 8rem;
            padding: .5rem;
            box-sizing: border-box;
            float: left;

            .inner {
              background: #fff;
              width: 100%;
              border-radius: .5rem;
              overflow: hidden;

              img {
                width: 100%;
              }

            }
          }
        }
      }
    }

    /*购车空*/
    .cart_empty {

      text-align: center;
      line-height: 3;

      h3 {
        font-size: 1.8rem;
      }
    }

  }
</style>

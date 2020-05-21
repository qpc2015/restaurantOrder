<template>
  <div id="order">
    <div class="order_content">

      <div class="order_head">
        <div class="order-top">
          <img src="../assets/images/timer.png" alt="">
          <div class="order_info_right">
            <h2>{{order.uid}}号桌待门店接单</h2>
            <div>请及时联系服务员确认已点菜品信息!</div>
          </div>
        </div>
        <div class="order_count">已点菜品{{order.total_num}}份,合计 : <span class="price">{{order.total_price}}元</span></div>
        <button @click="doPay()">
          立即支付
        </button>
      </div>

      <div class="order_list">
        <h3>菜品详情:</h3>
        <ul class="list">
          <li v-for="item in order.items">
            <div class="title">{{item.title}}</div>
            <div class="count">{{item.num}}份</div>
            <div class="price">{{item.price}}元</div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import Config from "../model/config.js";
  import storage from "../model/storage.js";

  export default {
    data() {
      return {
        api: Config.api,
        order: {}
      }
    },
    methods: {
      request() {
        var roomid = storage.get('roomid');
        var api = this.api + 'api/getOrder?uid=' + roomid;
        this.$http.get(api).then(response => {
          console.log(response);
          if (response.body.result.length > 0) {
            this.order = response.body.result[0];
          }
        }, error => {
          // error callback
          console.log(error);
        });
      },
      doPay() {
        var roomid = storage.get('roomid');
        var api = this.api + "api/doPay";
        this.$http.post(api, {
          uid: roomid,
          order_id: this.order._id,
          total_price: this.order.total_price,
          return_url: "http://localhost:8080/#/success"
        }).then(response => {
          console.log(response);
          if (response.body.result) {
            location.href = response.body.result.data;
          } else {
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
      this.request();
    }
  }
</script>

<style lang="scss">
  .order_content {
    padding: 1rem;

    .order_head {
      background-color: #fff;
      border-radius: .5rem;

      .order-top {
        display: flex;

        img {
          width: 5.6rem;
          height: 5.6rem;
        }

        .order_info_right {
          flex: 1;
          padding-top: .5rem;
        }
      }

      .order_count {
        line-height: 2rem;
        padding: .5rem;
        font-size: 1.4rem;

        .price {
          color: red;
          font-size: 2rem;
        }
      }

      button {
        width: 6rem;
        height: 3rem;
        background-color: aquamarine;
      }

    }

    .order_list {
      background-color: #fff;
      border-radius: .5rem;
      margin-top: 1rem;
      padding: .5rem;

      h3 {
        line-height: 2rem;
      }

      .list {
        li {
          display: flex;
          line-height: 2rem;
          padding: .5rem 0;

          .title {
            flex: 2;

          }

          .count {
            flex: 1;
            text-align: center;
          }

          .price {
            flex: 1;
            text-align: center;
          }
        }
      }

    }

    .order_pay {
      padding: .5rem;
      background-color: #fff;

      h3 {
        text-align: center;
        padding: 2rem 0 .5rem 0;
        font-size: 2rem;
      }

      .order-top {
        display: flex;
        line-height: 2;
        border-bottom: 1px solid #eee;
        padding: .5rem;
        text-align: left;

        .num {
          flex: 1;
        }

        .pcount {
          flex: 1;
        }

        .time {
          flex: 1;
        }

      }

      .order_bottom {
        display: flex;
        line-height: 2rem;
        margin: 1rem 0;
        padding-top: 1rem;

        .order_left {
          flex: 1;

          .price {
            color: red;
            font-size: 2rem;
          }
        }

        button {
          width: 10rem;
          border-radius: .5rem;
          background-color: red;
          color: #fff;
          text-align: center;
          height: 2.6rem;
          line-height: 2.6rem;
          position: relative;
          outline: none;
        }
      }
    }
  }
</style>

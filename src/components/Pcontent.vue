<template>
  <div id="pcontent">
    <router-link to="/home">
      <div class="back">&nbsp;&nbsp;&nbsp;返回</div>
    </router-link>

    <div class="p_content">
      <div class="p_info">
        <img v-if="content.img_url != undefined" v-lazy="api+content.img_url" />
        <h2>{{content.title}}</h2>
        <p class="price">{{content.price}}元/份</p>
      </div>
      <div class="p_detial">
        <h3>
          商品详情
        </h3>
        <div class="p_d_content">
          <p v-html="content.content">
          </p>
        </div>
      </div>
    </div>

    <footer class="pfooter">

      <div class="cart">
        <strong>数量:</strong>
        <div class="cart_num">
          <div class="input_left" @click="reduceCount()">-</div>
          <div class="input_center">
            <input type="text" readonly="readonly" v-model="num" name="num" id="num" />
          </div>
          <div class="input_right" @click="addCount()">+</div>
        </div>

      </div>

      <button class="addcart" @click="requestAddcart()">加入购物车</button>

    </footer>
  </div>
</template>

<script>
  import Config from "../model/config.js";
  import storage from "../model/storage.js";
  export default {
    data() {
      return {
        api: Config.api,
        content: {},
        num: 1
      }
    },
    methods: {
      requestDetail(id) {
        var api = this.api + "api/productcontent?id=" + id;
        this.$http.get(api).then(response => {

          console.log(response);
          this.content = response.body.result[0];
        }, response => {
          // error callback
        });
      },
      addCount() {
        this.num++;
      },
      reduceCount() {
        if (this.num > 1) {
          this.num--;
        }
      },
      requestAddcart() {
        var roomid = storage.get('roomid');
        var api = this.api + "api/addcart";
        this.$http.post(api, {
          uid: roomid,
          title: this.content.title,
          product_id: this.content._id,
          img_url: this.content.img_url,
          price: this.content.price,
          num: this.num,

        }).then(response => {

          console.log(response);
          if (response.body.success) {
            this.$socket.emit('addcart', 'addcart');
            this.$router.push({
              path: '/home'
            });
          }
          // this.content = response.body.result[0];
        }, response => {
          // error callback
        });
      }
    },
    mounted() {
      console.log(this.$route.query);
      this.requestDetail(this.$route.query.id);
    }
  }
</script>

<style lang="scss">
  .back {
    width: 3.8rem;
    height: 3.8rem;
    line-height: 3.8rem;
    border-radius: 50%;
    background-color: #000;
    text-align: center;
    position: fixed;
    top: .5rem;
    left: .5rem;
    color: #fff;

    &:before {
      content: "";
      display: block;
      width: .8rem;
      height: .8rem;
      border-left: .2rem solid #fff;
      border-bottom: .2rem solid #fff;
      // float: left;
      position: absolute;
      top: 1.3rem;
      left: .6rem;
      transform: rotate(45deg);
      margin-right: .4rem;

    }
  }

  .p_content {
    background: #fff;

    .p_info {
      img {
        width: 100%;
      }

      h2 {
        padding: .2rem .5rem;
      }

      .price {
        padding: .2rem .5rem;
        color: red;
      }


    }

    .p_detial {
      background-color: #fff;
      margin-top: 1rem;

      h3 {
        padding: .5rem;
      }

      .p_d_content {
        padding: 1rem;

        img {
          max-width: 100%;
          display: block;
          margin: 0 auto;
        }

        * {
          line-height: 1.5rem;
          color: #666;
        }
      }
    }
  }

  // 底部
  .pfooter {
    position: fixed;
    bottom: 0;
    height: 4.4rem;
    line-height: 4.4rem;
    background: #fff;
    left: 0;
    width: 100%;
    border-top: 1px solid #eee;

    .cart {
      float: left;
      display: flex;

      strong {
        flex: 1;
        font-size: 1.6rem;
        padding: 0rem .5rem;

      }

      .cart_num {
        width: 10rem;
        display: flex;
        margin-top: .8rem;

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

  .addcart {
    float: right;
    background-color: red;
    color: #fff;
    height: 3rem;
    border: none;
    padding: 0 .5rem;
    border-radius: .5rem;
    margin-top: .8rem;
    margin-right: .5rem;
  }
</style>

<template>
  <div id="home">
    <div class="home_content">
      <header class="home_head">
        <div class="hlist">
          <img src="../assets/images/rexiao.png" />
          <p>热销榜</p>
        </div>

        <div class="hlist">
          <img src="../assets/images/caidan.png" />
          <p>点过的菜</p>
        </div>
        <div class="hlist">
          <img src="../assets/images/sousuo.png" />
          <p>搜你喜欢</p>
        </div>

      </header>


      <aside class="left_cate" id="left_cate">
        <ul>
          <li v-for="(item,index) in list" @click="changeStyle(index)">{{item.title}}</li>
        </ul>

        <div id="nav_cate" class="nav_cate">
          <img src="../assets/images/nav.png" />
          <p>菜单</p>
        </div>
      </aside>

      <div class="content">
        <div class="item" v-for="order in list">
          <h3 class="item_cate">{{order.title}}</h3>
          <ul class="item_list">
            <li v-for="cate in order.list">
              <div class="inner">
                <router-link :to="'/pcontent?id='+cate._id">
                  <img :src="api+cate.img_url" />
                  <p class="title">{{cate.title}}</p>
                  <p class="price">¥{{cate.price}}</p>
                </router-link>

              </div>
            </li>

          </ul>
        </div>
      </div>

      <div class="bg" id="bg">
      </div>

      <k-navfooter></k-navfooter>

      <div id="footer_cart" class="footer_cart">
        <router-link to="/cart">
          <img src="../assets/images/cart.png" />
          <p>购物车</p>
        </router-link>

        <div class="count" v-if="count">
          {{count}}
        </div>
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
        list: [],
        api: Config.api,
        count:0
      }
    },
    sockets:{
      addcart:function(){
        this.requestCartCount();
      }
    },
    methods: {
      leftListClick() {
        let navCate = document.getElementById("nav_cate");
        let leftCate = document.getElementById("left_cate");
        let bg = document.getElementById("bg");
        var flag = true;
        bg.onclick = navCate.onclick = function() {
          if (flag) {
            flag = false;
            leftCate.style.transform = "translate(0,0)";
            bg.style.display = "block";
          } else {
            flag = true;
            leftCate.style.transform = "translate(-100%,0)";
            bg.style.display = "none";
          }
        }
      },
      requestData() {
        var api = this.api + "api/productlist";
        this.$http.get(api).then(response => {

          console.log(response);
          this.list = response.body.result;

        }, response => {
          // error callback
        });
      },
      requestCartCount() {
        var roomid = storage.get('roomid');
        var api = this.api + "api/cartCount?uid="+roomid;
        this.$http.get(api).then(response => {

          console.log(response);
           this.count = response.body.result;
        }, response => {
          // error callback
        });
      },
      changeStyle(index) {

        var items = document.querySelectorAll('.item_cate');
        console.log(items);
        document.documentElement.scrollTop = items[index].offsetTop;

        let leftCate = document.getElementById("left_cate");
        let bg = document.getElementById("bg");
        leftCate.style.transform = "translate(-100%,0)";
        bg.style.display = "none";
      }

    },
    mounted() {
      this.leftListClick();
      this.requestData();
      this.requestCartCount();
    },
    components: {
      "k-navfooter": NavFooter
    }
  }
</script>

<style lang="scss">
  .home_head {
    width: 96%;
    margin: 0 auto;
    height: 4.4rem;
    background: #fff;
    margin-top: 1rem;
    border-radius: .5rem;
    display: flex;

    .hlist {
      flex: 1;
      text-align: center;
      padding-top: .2rem;
      border-right: 1px solid #eee;

      img {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
      }
    }

    .hlist:last-child {
      border-right: none;
    }

  }

  .left_cate {
    transition: all 1s;
    transform: translate(-100%, 0);
    z-index: 2;
    width: 6rem;
    height: 100%;
    position: fixed;
    background-color: #eee;
    left: 0;
    top: 0;

    ul {
      height: 100%;
      padding: .5rem;
      z-index: 3;
      background-color: #eee;

      li {
        line-height: 4.4rem;
      }
    }

    .nav_cate {
      position: absolute;
      right: -3.5rem;
      background-color: rgba(132, 128, 128, 0.9);
      top: 42%;
      width: 5rem;
      height: 4rem;
      text-align: center;
      border-radius: 0 50% 50% 0;
      z-index: -1;

      img {
        width: 1.8rem;
        height: 1.8rem;
        margin-left: 1rem;
        margin-top: .4rem;
      }

      p {
        color: #fff;
        margin-left: 1rem;
        margin-top: -0.3rem;
      }
    }
  }

  .content {
    .item {
      .item_cate {
        text-align: center;
        padding: .5rem;
      }

      .item_list {
        display: flex;
        flex-wrap: wrap;
        padding: 0px .5rem;

        li {
          width: 33.3%;
          padding: .5rem;
          box-sizing: border-box;

          .inner {
            background-color: #fff;
            width: 100%;
            border-radius: .5rem;
            overflow: hidden;

            a {
              color: #666;
              text-decoration: none;
            }

            img {
              width: 100%;
              height: 10rem;
            }

            p {
              padding: .2rem .5rem;
            }

            .title {
              font-weight: bold;
            }
          }
        }
      }


    }
  }

  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(132, 128, 128, 0.4);
    left: 0;
    top: 0;
    z-index: 1;
    display: none;
  }
</style>

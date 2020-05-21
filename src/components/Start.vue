<template>
  <div id="start">
    <div v-if='showLoading'>
      放loading图片 gif showLoading...........
    </div>

    <div class="start_content" v-if="!showLoading">
      <header class="start_header">
        <img src="../assets/images/canju.png" alt="">
        用餐人数
      </header>

      <p class="tip">请选择正确的用餐人数 ，小二马上给你送餐具</p>

      <div class="content">
        <ul class="user_list">
          <li v-for="(n,index) in 12" @click="peopleNumDidClick(index)" :class="{active:index == 0}">
            <span>{{n}}人</span>
          </li>
        </ul>
      </div>
      <div class="mark_input">
        <input type="text" class="mark" v-model="p_mark" placeholder="请输入你的口味要求,忌口等(可以不填写)">
      </div>

      <div class="marktag">
        <ul class="mark_list">
          <li>
            <span>打包带走</span>
          </li>
          <li>
            <span>
              暂不上菜
            </span>
          </li>
          <li>
            <span>
              不要辣
            </span>
          </li>
        </ul>
      </div>


      <div class="start" @click="startOrder()">
        <span>开始点菜</span>
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
        p_num: 1,
        p_mark: '',
        showLoading: true
      }
    },
    methods: {
      peopleNumDidClick(index) {
        var lis = document.querySelectorAll(".user_list li");
        for (var i = 0; i < lis.length; i++) {
          var li = lis[i];
          li.className = '';
        }
        console.log(lis.length + "     " + index);
        var countli = lis[index];
        countli.className = 'active';
        this.p_num = parseInt(countli.querySelector('span').innerText);
      },
      addChangeEnvet() {
        var that = this;
        //口味的dom操作
        var markLis = document.querySelectorAll('.mark_list li');

        for (var i = 0; i < markLis.length; i++) {
          markLis[i].onclick = function() {

            for (var j = 0; j < markLis.length; j++) {
              markLis[j].className = '';
            }
            this.className = 'active'; //this 就是li这个dom节点
            that.p_mark = that.p_mark + ' ' + this.querySelector('span').innerHTML.trim();
          }
        }
      },
      startOrder() {
        var api = this.api + 'api/addPeopleInfo';
        storage.set
        var roomid = storage.get('roomid');
        this.$http.post(api, {
          uid: roomid,
          p_num: this.p_num,
          p_mark: this.p_mark
        }).then((response) => {
          console.log(response);
          if (response.body.success) {
            this.$router.push({
              path: "home"
            });
          }
        }, (err) => {
          console.log(err);
        })
      },
      requestPeopleInfo() {
        var roomid = storage.get('roomid');
        var api = this.api + 'api/peopleInfoList?uid=' + roomid;
        this.$http.get(api).then(response => {
          this.showLoading = false;
          console.log(response);
          if (response.body.result.length > 0) {
            this.$router.push({
              path: 'home'
            });
          }
        }, error => {
          // error callback
          console.log(error);
        });
      }
    },
    created() {
      this.requestPeopleInfo()
    },
    mounted() {
      this.addChangeEnvet();
    }
  }
</script>

<style lang="scss">
  .start_content {

    .start_header {
      height: 3.2rem;
      line-height: 3.2rem;
      background-color: #000;
      color: #fff;
      width: 10rem;
      margin: 5rem auto 0rem auto;
      border-radius: 0.5rem;

      img {
        height: 2.2rem;
        line-height: 2.2rem;
        position: relative;
        top: 0.5rem;
        margin-left: 1rem;
      }
    }

    .tip {
      color: red;
      text-align: center;
      margin: 1rem 0rem;
    }

    .content,
    .marktag {

      .user_list,
      .mark_list {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5rem;

        li {
          width: 25%;
          padding: 0.5rem;
          box-sizing: border-box;

          span {
            display: block;
            text-align: center;
            border: 1px solid #ccc;
            width: 100%;
            height: 3.2rem;
            line-height: 3.2rem;
            background: #fff;
            border-radius: 0.5rem;
          }
        }

        li.active {
          span {
            background-color: red;
            color: #fff;
            border: 1px solid red;
          }
        }
      }
    }

    .mark_input {
      padding: 1rem;

      input {
        height: 3rem;
        line-height: 3rem;
        width: 100%;
        border: 1px solid #eee;
      }
    }

    .start {
      position: fixed;
      bottom: 5rem;
      left: 50%;
      margin-left: -3rem;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      background-color: red;
      color: #fff;
      text-align: center;

      span {
        display: block;
        width: 2rem;
        margin: 0 auto;
        position: relative;
        top: 1.5rem;
      }
    }

  }
</style>

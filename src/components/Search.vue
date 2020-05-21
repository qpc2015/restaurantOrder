<template>
  <div id="search">
    <div class="search_header">
      <input type="search" class="search">
    </div>

    <div class="search_content">
      <ul class="item_list">
        <li>
          <img class="item_img" src="../assets/images/1.jpg" />
          <div class="inner">
            <h3 class="title">大蒜腊肉</h3>
            <p class="price">¥26</p>
            <span>已售:351份</span>
          </div>
        </li>
        <li>
          <img class="item_img" src="../assets/images/2.jpg" />
          <div class="inner">
            <h3 class="title">大蒜腊肉</h3>
            <p class="price">¥26</p>
            <span>已售:351份</span>
          </div>
        </li>
        <li>
          <img class="item_img" src="../assets/images/3.jpg" />
          <div class="inner">
            <h3 class="title">大蒜腊肉</h3>
            <p class="price">¥26</p>
            <span>已售:351份</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="search_footer">

      <div id="footer_nav" class="footer_nav">
        <img src="../assets/images/navigation.png" />
        <p>导航</p>
      </div>

      <div id="footer_book" class="footer_book">
        <img src="../assets/images/menu.png" />
        <p>菜单</p>
      </div>

      <div id="footer_cart" class="footer_cart">
        <img src="../assets/images/cart.png" />
        <p>购物车</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
  .search_header {
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    width: 100%;

    .search {
      width: 90%;
      height: 3.8rem;
      line-height: 3.8rem;
      border-radius: .5rem;
      border: 1px solid #eee;
    }
  }

  .search_content {
    background: #fff;

    .item_list {
      li {
        display: flex;
        border-bottom: 1px solid #eee;
        padding-top: 1rem;
        padding-bottom: 1rem;

        img {
          width: 6rem;
          height: 6rem;
        }

        .inner {
          flex: 1;
          padding-left: 1rem;
        }
      }
    }



  }
</style>

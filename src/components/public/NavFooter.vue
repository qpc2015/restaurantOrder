<template>
  <div id="navFooter">

    <div id="footer_nav" class="footer_nav" @click="flag=!flag">
      <img src="../../assets/images/navigation.png" />
      <p>导航</p>
    </div>

    <div class="footer_nav_show" v-if="flag">

      <ul class="list">

        <li>

          <img src="../../assets/images/menu.png" />
          <p>菜单</p>
        </li>

        <li>

          <img src="../../assets/images/cart.png" />
          <p>购物车</p>

        </li>

        <li>

          <img src="../../assets/images/order.png" />
          <p>我的订单</p>


        </li>

        <li>

          <img src="../../assets/images/wallet.png" />
          <p>结账</p>


        </li>

        <li @click="flag=!flag">
          <img src="../../assets/images/close.png" />
          <p>返回</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
	data(){
		return {
			flag:false
		}
	}
  }

</script>

<style lang="scss">
  // 导航
  #footer_nav {
    height: 4.4rem;
    width: 4.4rem;
    background: #000;
    position: fixed;
    color: #fff;
    bottom: .5rem;
    left: .5rem;
    text-align: center;
    border-radius: 50%;

    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-top: .4rem;
    }

    p {
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: .4rem;
    }
  }

  .footer_nav_show {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);

    .list li {
      height: 4.4rem;
      width: 4.4rem;
      background: #000;
      position: absolute;
      color: #fff;
      left: .5rem;
      text-align: center;
      border-radius: 50%;


      img {
        width: 1.8rem;
        height: 1.8rem;
        margin-top: .4rem;
      }

      p {
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: .4rem;
      }

      &:nth-child(1) {
        bottom: 15.4rem;
        left: 0px;
      }

      &:nth-child(2) {
        bottom: 12.4rem;
        left: 25%;
      }

      &:nth-child(3) {
        bottom: 7.4rem;
        left: 45%;
      }

      &:nth-child(4) {
        bottom: .5rem;
        left: 50%;
      }

      &:nth-child(5) {
        bottom: .5rem;
        left: .5rem;
      }
    }
  }
</style>

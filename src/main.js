import Vue from 'vue'
import App from './App.vue'
import storage from './model/storage.js'

//数据请求
import VueResource from 'vue-resource';
Vue.use(VueResource);

//图片懒加载
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
  error: require('./assets/images/error_icon.png'),
  loading: require('./assets/images/error_icon.png')
});

console.log(window.location.hash.split('=')[1]);
let roomid = window.location.hash.split('=')[1];
storage.set('roomid',roomid);

//sockets
import VueSocketIo from 'vue-socket.io';
Vue.use(new VueSocketIo({
  debug: true,
  connection: 'http://a.itying.com?roomid=q001'
}));

//引入路由  use路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//1、创建引入组件
import Cart from './components/Cart.vue';
import Home from './components/Home.vue';
import Hot from './components/Hot.vue';
import Order from './components/Order.vue';
import Pcontent from './components/Pcontent.vue';
import Search from './components/Search.vue';
import Start from './components/Start.vue';
import EditPeople from './components/EditPeopleInfo.vue';
import Sucess from './components/Sucess.vue'


//2、配置路由
const routes = [{
    path: '/start',
    component: Start
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/hot',
    component: Hot
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/pcontent',
    component: Pcontent
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/editPeople',
    component: EditPeople
  },
  {
    path: '/sucess',
    component: Sucess
  },
  {
    path: '*',
    redirect: '/start'
  }
]

//3、实例化VueRouter
const router = new VueRouter({
  routes
});


new Vue({
  el: '#app',
  router,
  sockets: { /*测试期间写 也不不写在根里面*/
    connect: function() {
      console.log('socket connected')
    }
  },
  render: h => h(App)
})

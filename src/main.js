import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Index from '@/styles/index.less'




Vue.config.productionTip = false

// 挂载elemnt样式
Vue.use(ElementUI);
// 挂载初始化样式文件
Vue.use(Index)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

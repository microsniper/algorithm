// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(elementUI)

Vue.filter('dataFormat',function(originVal){

  const dt= new Date(originVal)

  const y= dt.getFullYear()

  const m=(dt.getMonth()+1+'').padStart(2,'0')  //padStart是字符串方法，首先必须把数据转换成字符串(文中直接拼接一个空字符串从而将数据换成字符串性)，然后才能使用padStart方法。！！padStart接收两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

  const d=(dt.getDate()+1+'').padStart(2,'0')

  const hh =(dt.getHours()+'').padStart(2,'0')

  const mm =(dt.getMinutes()+'').padStart(2,'0')

  const ss=(dt.getSeconds()+'').padStart(2,'0')

  // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  return `${y}-${m}-${d}`

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

import Vue from 'vue'
import App from './App'
import image from '../src/tooles/imgList'
//引入weui
import '../static/weui/weui.css'
//引入Fly
import Fly from 'flyio/dist/npm/wx'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.fly = new Fly
Vue.prototype.image = image
const app = new Vue(App)
app.$mount()

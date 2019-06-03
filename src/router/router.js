import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
Vue.use(VueRouter)


export default new VueRouter({
    routes:[
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Null',
            path:'/',
            redirect:{
                name:'Login'
            }
        },
        {
            name:'Home',
            path:'/home',
            component:Home
        },
    ]
})
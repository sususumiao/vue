import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import User from '@/views/users/user.vue'
import Rights from '@/views/rights/rights.vue'
import Roles from '@/views/rights/roles.vue'
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
            component:Home,
            redirect:{name:'Welcome'},
            children:[
                {
                    name:'Welcome',
                    path:'welcome',
                    component:Welcome
                },
                {
                    name:'User',
                    path:'user',
                    component:User
                },
                {
                    name:'Rights',
                    path:'rights',
                    component:Rights
                }
                ,
                {
                    name:'Roles',
                    path:'roles',
                    component:Roles
                }
            ]
        },
    ]
})
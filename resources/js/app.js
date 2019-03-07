
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueProgressBar from 'vue-progressbar'
import VueRouter from 'vue-router'
import moment from 'moment'
import Swal from 'sweetalert2'
import {Form,HasError,AlertError} from 'vform'

window.Vue = require('vue');
window.Form = Form;

/**SweetAlert Global Call */
window.Swal = Swal;
window.Toast = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

/**Custom Event Global */
window.Fire = new Vue();

/**VueJS Form Global */
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

/**Progressbar Global Call*/
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

/**Routers */
Vue.use(VueRouter)
const routes = [
    {path: '/dashboard',component: require('./components/Dashboard.vue').default}, 
    {path: '/profile',component: require('./components/Profile.vue').default}, 
    {path: '/users',component: require('./components/Users.vue').default},
    {path: '/coupons',component: require('./components/Coupons.vue').default}
]
const router = new VueRouter({
    mode: 'history',
    routes
})

/**Global Custom Functions */
Vue.filter('upText',function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function(date){
    return moment(date).format('MM/DD/YYYY h:mm:ss a');
});

/**VueJS Components */
const app = new Vue({
    el: '#app',
    router
});

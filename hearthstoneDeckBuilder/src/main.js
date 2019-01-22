// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Menu from './Menu'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

Vue.config.productionTip = false
/* eslint-disable no-new */

// компоненты, которые обрабатывают пути
const NotFound = { template: '<h2>Page Not Found</h2>' }
const Home = {
// language=HTML
  template: '<ul>\n' +
  '    <li><router-link to="/" exact>Home</router-link></li>\n' +
  '    <li><router-link to="/DeckBuilder">DeckBuilder</router-link></li>\n' +
  '    <li><router-link to="/App">App</router-link></li>\n' +
  '</ul>' }

// маршруты, сопотавленные с компонентами
const routes = [
  { path: '/', component: Home },
  { path: '/App', component: App },
  { path: '/DeckBuilder', component: Menu },
  { path: '*', component: NotFound }
];
// создаем объект маршрутизатора
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  el: '#app',
  router: router
})


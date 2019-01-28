import Vue from 'vue'
import Router from 'vue-router'
import Questions from './components/Questions.vue'
import About from './components/About.vue'
import QuestionList from './components/QuestionList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'questions',
      component: Questions
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path:'/questionlist',
      name:'questionlist',
      component: QuestionList
    }
  ]
})
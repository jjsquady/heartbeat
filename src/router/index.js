import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import RemoteForm from '@/components/RemoteForm'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/remote',
      name: 'AddRemote',
      component: RemoteForm
    },
    {
      path: '/remote/:id',
      name: 'EditRemote',
      component: RemoteForm
    }
  ],
});

const rotasmain = [
    {
      path: '/',
      name: 'Home',
      component: import('@/views/Home.vue')
    },
    {
      path: '/cadastrar',
      name: 'Cadastro',
      component: () => import('@/views/Cadastro.vue')
    },
  
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
  export {rotasmain};
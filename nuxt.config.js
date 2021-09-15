const { resolve } = require('path');

module.exports = {
  alias: {
    '@': resolve(__dirname, './')
  },
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push({
        path: '/',
        component: resolve(__dirname, 'pages/layout/index.vue'),
        children: [
          {
            name: 'home',
            path: '',
            component: resolve(__dirname, 'pages/home/index.vue')
          },
          {
            name: 'login',
            path: '/login',
            component: resolve(__dirname, 'pages/login/index.vue')
          },
          {
            name: 'register',
            path: '/register',
            component: resolve(__dirname, 'pages/login/index.vue')
          },
          {
            name: 'settings',
            path: '/settings',
            component: resolve(__dirname, 'pages/settings/index.vue')
          },
          {
            name: 'editor',
            path: '/editor',
            component: resolve(__dirname, 'pages/editor/index.vue')
          },
          {
            name: 'editArticle',
            path: '/editor/:slug',
            component: resolve(__dirname, 'pages/editor/_slug.vue')
          },
          {
            name: 'article',
            path: '/article/:slug',
            component: resolve(__dirname, 'pages/article/index.vue')
          },
          {
            name: 'profile',
            path: '/profile/:username',
            component: resolve(__dirname, 'pages/profile/index.vue')
          }
        ]
      })
    }
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}
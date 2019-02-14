const routes = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('../components/auth/SignIn')
  },
  {
    path: '/oauth/:provider/token',
    name: 'sign-in-token',
    component: () => import('../components/auth/SignInOauthToken')
  }
]
module.exports = routes;
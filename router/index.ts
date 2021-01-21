// umi routes: https://umijs.org/zh/guide/router.html
import SystemMgt from './system-mgt';

const router = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/white',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/white',
            redirect: '/white/login',
          },
          {
            name: 'login',
            path: '/white/login',
            remark: '登录',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              {
                path: '/home',
                name: 'home',
                component: './home',
                remark: '首页',
              },
              SystemMgt,
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];

module.exports = router;

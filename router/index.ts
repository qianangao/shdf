// umi routes: https://umijs.org/zh/guide/router.html
import SynergyOffice from './synergy-office';
import ThreadMgt from './thread-mgt';
import CaseMgt from './case-mgt';
import SensitiveEventMgt from './sensitive-event-mgt';
import EngineeringMgt from './engineering-mgt';
import KeyData from './key-data';
import Analysis from './analysis';
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
              SynergyOffice,
              ThreadMgt,
              CaseMgt,
              SensitiveEventMgt,
              EngineeringMgt,
              KeyData,
              Analysis,
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
export default router;

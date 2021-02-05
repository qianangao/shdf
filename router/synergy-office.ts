const routes = {
  path: '/synergy-office',
  name: 'synergy-office',
  remark: '协同办公',
  routes: [
    {
      path: '/synergy-office/receiving-mgt',
      name: 'synergy-office-receiving-mgt',
      component: './synergy-office/receiving-mgt',
      icon: 'setting',
      remark: '收文管理',
    },
    {
      path: '/synergy-office/address-book',
      name: 'synergy-office-address-book',
      component: './synergy-office/address-book',
      icon: 'setting',
      remark: '通讯录',
    },
    {
      path: '/synergy-office/announcement-mgt',
      name: 'synergy-office-announcement-mgt',
      icon: 'setting',
      remark: '公告管理',
      routes: [
        {
          path: '/synergy-office/announcement-mgt/release-management',
          name: 'synergy-office-announcement-mgt/release-management',
          component: './synergy-office/announcement-mgt/release-management',
          remark: '发布管理',
        },
        {
          path: '/synergy-office/announcement-mgt/receive-management',
          name: 'synergy-office-announcement-mgt/receive-management',
          component: './synergy-office/announcement-mgt/receive-management',
          remark: '接收管理',
        }
      ]
    },
    {
      path: '/synergy-office',
      redirect: '/synergy-office/receiving-mgt',
      hideInMenu: true,
    },
  ],
};

export default routes;

const routes = {
  path: '/synergy-office',
  name: 'synergy-office',
  remark: '协同办公',
  authority: 'so',
  routes: [
    {
      path: '/synergy-office/document-mgt',
      name: 'synergy-office-document-mgt',
      icon: 'reconciliation',
      remark: '公文管理',
      authority: 'so/dm',
      routes: [
        {
          path: '/synergy-office/document-mgt/release-management',
          name: 'synergy-office-document-mgt/release-management',
          component: './synergy-office/document-mgt/release-management',
          remark: '发布管理',
          authority: 'so/dm/rm',
        },
        {
          path: '/synergy-office/document-mgt/receive-management',
          name: 'synergy-office-document-mgt/receive-management',
          component: './synergy-office/document-mgt/receive-management',
          remark: '接收管理',
          authority: 'so/dm/rec',
        },
      ],
    },
    {
      path: '/synergy-office/address-book',
      name: 'synergy-office-address-book',
      component: './synergy-office/address-book',
      icon: 'read',
      remark: '通讯录',
    },
    {
      path: '/synergy-office/announcement-mgt',
      name: 'synergy-office-announcement-mgt',
      icon: 'notification',
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
        },
      ],
    },
    {
      path: '/synergy-office',
      redirect: '/synergy-office/address-book',
      hideInMenu: true,
    },
  ],
};

export default routes;

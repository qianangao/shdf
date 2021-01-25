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
      component: './synergy-office/announcement-mgt',
      icon: 'setting',
      remark: '公告管理',
    },
    {
      path: '/synergy-office',
      redirect: '/synergy-office/receiving-mgt',
      hideInMenu: true,
    },
  ],
};

export default routes;

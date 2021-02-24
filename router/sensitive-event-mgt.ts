const routes = {
  path: '/sensitive-event-mgt',
  name: 'sensitive-event-mgt',
  remark: '敏感事件管理',
  routes: [
    {
      path: '/sensitive-event-mgt',
      redirect: '/sensitive-event-mgt/key-institutions',
      hideInMenu: true,
    },
    {
      path: '/sensitive-event-mgt/key-institutions',
      name: 'sensitive-event-mgt-key-institutions',
      component: './sensitive-event-mgt/key-institutions',
      icon: 'setting',
      remark: '敏感事件',
    },
  ],
};

export default routes;

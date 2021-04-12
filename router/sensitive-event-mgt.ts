const routes = {
  path: '/sensitive-event-mgt',
  name: 'sensitive-event-mgt',
  remark: '敏感事件管理',
  authority: 'sem',
  routes: [
    {
      path: '/sensitive-event-mgt',
      redirect: '/sensitive-event-mgt/sensitive-event',
      hideInMenu: true,
    },
    {
      path: '/sensitive-event-mgt/sensitive-event',
      name: 'sensitive-event-mgt-sensitive-event',
      component: './sensitive-event-mgt/sensitive-event',
      icon: 'setting',
      remark: '敏感事件管理',
      authority: 'sem',
    },
  ],
};

export default routes;

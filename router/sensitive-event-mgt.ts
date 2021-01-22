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
  ],
};

export default routes;

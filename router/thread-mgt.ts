const routes = {
  path: '/thread-mgt',
  name: 'thread-mgt',
  remark: '线索管理',
  routes: [
    {
      path: '/thread-mgt/thread-mgt0',
      name: 'thread-mgt0',
      component: './thread-mgt',
      icon: 'setting',
      remark: '线索管理',
    },
    {
      path: '/thread-mgt',
      redirect: '/thread-mgt/thread-mgt0',
      hideInMenu: true,
    },
  ],
};

export default routes;

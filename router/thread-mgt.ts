const routes = {
  path: '/thread-mgt',
  name: 'thread-mgt',
  remark: '线索管理',
  routes: [
    {
      path: '/thread-mgt',
      name: 'thread-mgt',
      component: './thread-mgt',
      icon: 'setting',
      remark: '线索管理',
    },
    {
      path: '/thread-mgt',
      redirect: '/thread-mgt',
      hideInMenu: true,
    },
  ],
};

export default routes;

const routes = {
  path: '/thread-mgt',
  name: 'thread-mgt',
  remark: '线索管理',
  routes: [
    {
      path: '/thread-mgt',
      redirect: '/thread-mgt/key-institutions',
      hideInMenu: true,
    },
  ],
};

export default routes;

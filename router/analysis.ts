const routes = {
  path: '/analysis',
  name: 'analysis',
  remark: '智能分析',
  routes: [
    {
      path: '/analysis',
      redirect: '/analysis/key-institutions',
      hideInMenu: true,
    },
  ],
};

export default routes;

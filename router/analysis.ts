const routes = {
  path: '/analysis',
  name: 'analysis',
  remark: '智能分析',
  routes: [
    {
      path: '/analysis',
      redirect: '/analysis/statistics',
      hideInMenu: true,
    },
    {
      path: '/analysis/statistics',
      name: 'analysis-statistics',
      component: './analysis/statistics',
      remark: '统计分析',
      icon: 'folder',
    },
  ],
};

export default routes;
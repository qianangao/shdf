const routes = {
  path: '/analysis',
  name: 'analysis',
  remark: '智能分析',
  authority: 'an',
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
      authority: 'an/as',
      // icon: 'folder',
    },
    {
      path: '/analysis/trend',
      name: 'analysis-trend',
      component: './analysis/trend',
      remark: '趋势分析',
      authority: 'an/at',
      // icon: 'folder',
    },
  ],
};

export default routes;

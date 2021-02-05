const routes = {
  path: '/case-mgt',
  name: 'case-mgt',
  remark: '案件管理',
  routes: [
    {
      path: '/case-mgt',
      redirect: '/case-mgt/vocational-work',
      hideInMenu: true,
    },
    {
      path: '/case-mgt/vocational-work',
      name: 'case-mgt-vocational-work',
      component: './case-mgt/vocational-work',
      icon: 'setting',
      remark: '案件业务管理',
    },
  ],
};

export default routes;

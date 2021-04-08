const routes = {
  path: '/case-mgt',
  name: 'case-mgt',
  remark: '案件管理',
  authority: 'cm',
  routes: [
    {
      path: '/case-mgt/vocational-work',
      name: 'case-mgt-vocational-work',
      component: './case-mgt/vocational-work',
      icon: 'aim',
      remark: '案件管理',
      authority: 'cm',
    },
    {
      path: '/case-mgt',
      redirect: '/case-mgt/vocational-work',
      hideInMenu: true,
    },
  ],
};

export default routes;

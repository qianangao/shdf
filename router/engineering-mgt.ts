const routes = {
  path: '/engineering-mgt',
  name: 'engineering-mgt',
  remark: '工程管理',
  routes: [
    {
      path: '/engineering-mgt/special-project',
      name: 'engineering-mgt-special-project',
      component: './engineering-mgt/special-project',
      remark: '专项工程',
    },
    {
      path: '/engineering-mgt/dictionary-mgt',
      name: 'engineering-mgt-dictionary-mgt',
      component: './engineering-mgt/special-project',
      remark: '联防工程',
    },
    {
      path: '/engineering-mgt',
      redirect: '/engineering-mgt/special-project',
      hideInMenu: true,
    },
  ],
};

export default routes;

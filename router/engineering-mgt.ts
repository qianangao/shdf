const routes = {
  path: '/engineering-mgt',
  name: 'engineering-mgt',
  remark: '工程管理',
  routes: [
    {
      path: '/engineering-mgt/key-person',
      name: 'engineering-mgt-key-person',
      component: './engineering-mgt/key-institutions',
      remark: '重点人物',
    },
    {
      path: '/engineering-mgt/key-institutions',
      name: 'engineering-mgt-key-institutions',
      component: './engineering-mgt/key-institutions',
      remark: '重点机构',
    },
    {
      path: '/engineering-mgt/special-project',
      name: 'engineering-mgt-special-project',
      component: './engineering-mgt/special-project',
      remark: '专项工程',
    },
    {
      path: '/engineering-mgt/dictionary-mgt',
      name: 'engineering-mgt-dictionary-mgt',
      component: './engineering-mgt/dictionary-mgt',
      remark: '联防工程',
    },
    {
      path: '/engineering-mgt',
      redirect: '/engineering-mgt/key-institutions',
      hideInMenu: true,
    },
  ],
};

export default routes;

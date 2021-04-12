const routes = {
  path: '/engineering-mgt',
  name: 'engineering-mgt',
  remark: '工程管理',
  authority: 'em',
  routes: [
    {
      path: '/engineering-mgt/special-project',
      name: 'engineering-mgt-special-project',
      component: './engineering-mgt/special-project',
      remark: '专项行动',
      authority: 'em/sa',
      icon: 'folder',
    },
    {
      path: '/engineering-mgt/joint-defense-engineering',
      name: 'engineering-mgt-joint-defense-engineering',
      component: './engineering-mgt/joint-defense-engineering',
      remark: '联防工程',
      authority: 'em/dep',
      icon: 'folderAdd',
    },
    {
      path: '/engineering-mgt',
      redirect: '/engineering-mgt/special-project',
      hideInMenu: true,
    },
  ],
};

export default routes;

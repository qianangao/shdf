const routes = {
  path: '/key-data',
  name: 'key-data',
  remark: '重点数据',
  routes: [
    {
      path: '/key-data/key-person-mgt',
      name: 'key-data-key-person-mgt',
      component: './key-data/key-person-mgt',
      icon: 'setting',
      remark: '重点人物',
    },
    {
      path: '/key-data/key-institutions-mgt',
      name: 'key-data-key-institutions-mgt',
      component: './key-data/key-institutions-mgt',
      icon: 'setting',
      remark: '重点机构',
    },
    {
      path: '/key-data/ban-publish-mgt',
      name: 'key-data-ban-publish-mgt',
      component: './key-data/ban-publish-mgt',
      icon: 'setting',
      remark: '非法出版物',
    },
    {
      path: '/key-data',
      redirect: '/key-data/key-person-mgt',
      hideInMenu: true,
    },
  ],
};

export default routes;

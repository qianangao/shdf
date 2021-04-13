const routes = {
  path: '/key-data',
  name: 'key-data',
  remark: '重点数据',
  authority: 'kd',
  routes: [
    {
      path: '/key-data/key-person-mgt',
      name: 'key-data-key-person-mgt',
      component: './key-data/key-person-mgt',
      icon: 'user',
      remark: '重点人物',
      authority: 'kd/kpm',
    },
    {
      path: '/key-data/key-institutions-mgt',
      name: 'key-data-key-institutions-mgt',
      component: './key-data/key-institutions-mgt',
      icon: 'shop',
      remark: '重点机构',
      authority: 'kd/kim',
    },
    {
      path: '/key-data/ban-publish-mgt',
      name: 'key-data-ban-publish-mgt',
      component: './key-data/ban-publish-mgt',
      icon: 'book',
      remark: '非法出版物',
      authority: 'kd/bpm',
    },
    {
      path: '/key-data',
      redirect: '/key-data/key-person-mgt',
      hideInMenu: true,
    },
  ],
};

export default routes;

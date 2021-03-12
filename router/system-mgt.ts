const routes = {
  path: '/system-mgt',
  name: 'system-mgt',
  remark: '系统管理',
  routes: [
    {
      path: '/system-mgt/organization-mgt',
      name: 'system-mgt-organization-mgt',
      component: './system-mgt/organization-mgt',
      icon: 'setting',
      // authority: '08-01',
      remark: '单位管理',
    },
    {
      path: '/system-mgt/role-mgt',
      name: 'system-mgt-role-mgt',
      component: './system-mgt/role-mgt',
      icon: 'setting',
      remark: '角色管理',
    },
    {
      path: '/system-mgt/authority-mgt',
      name: 'system-mgt-authority-mgt',
      component: './system-mgt/authority-mgt',
      icon: 'setting',
      remark: '权限管理',
    },
    {
      path: '/system-mgt/dictionary-mgt',
      name: 'system-mgt-dictionary-mgt',
      component: './system-mgt/dictionary-mgt',
      icon: 'setting',
      remark: '字典管理',
    },
    {
      path: '/system-mgt/log-audit',
      name: 'system-mgt-log-audit',
      component: './system-mgt/log-audit',
      icon: 'setting',
      remark: '日志审计',
    },
    {
      path: '/system-mgt',
      redirect: '/system-mgt/organization-mgt',
      hideInMenu: true,
    },
  ],
};

export default routes;

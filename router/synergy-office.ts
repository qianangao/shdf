const routes = {
  path: '/synergy-office',
  name: 'synergy-office',
  remark: '协同办公',
  routes: [
    {
      path: '/synergy-office',
      redirect: '/synergy-office/key-institutions',
      hideInMenu: true,
    },
  ],
};

export default routes;

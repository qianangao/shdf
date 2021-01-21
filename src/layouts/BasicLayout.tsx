/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link, connect } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '@/assets/logo.svg';
import BasicFooter from './BasicFooter';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="对不起，您没有权限访问此页。"
    extra={
      <Button type="primary">
        <Link to="/white/login">返回登陆页</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {
      ...item,
      // 使用remark替换name作为菜单以及面包屑展示
      name: item.remark || item.title || item.name,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null);
  });

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  /**
   * init variables
   */
  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  // get children authority
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => {
        return [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ];
      }}
      itemRender={(route, params, routes) => {
        const last = routes.indexOf(route) === routes.length - 1;

        return last ? (
          <span>{route.breadcrumbName}</span>
        ) : (
          <Link to={route.path}>{route.breadcrumbName}</Link>
        );
      }}
      footerRender={BasicFooter}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);

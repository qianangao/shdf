/* eslint-disable */
import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';

type SecurityLayoutProps = {
  loading?: boolean;
  currentUser?: CurrentUser;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, userInfo } = this.props;
    // TODO 待确认鉴权方案
    // // You can replace it to your authentication rule (such as check token exists)
    // // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    // const isLogin = userInfo && userInfo.id;
    // const queryString = stringify({
    //   redirect: window.location.href,
    // });

    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading />;
    // }
    // if (!isLogin && window.location.pathname !== '/white/login') {
    //   return <Redirect to={`/white/login?${queryString}`} />;
    // }
    return children;
  }
}

export default connect(({ user, loading }) => ({
  userInfo: user.userInfo,
  loading: loading.models.user,
}))(SecurityLayout);

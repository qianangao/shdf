import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';

import FontIcon from '@/components/FontIcon';

import React from 'react';
import { connect } from 'umi';
import HeaderDropdown from './HeaderDropdown';
import styles from './index.less';
import ResetPasswordModel from './ResetPasswordModel';

class AvatarDropdown extends React.Component {
  resetRef = null;

  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
    }

    if (key === 'resetPwd') {
      this.resetRef && this.resetRef.showModal();
    }
  };

  render() {
    const {
      userInfo = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="resetPwd">
            <SettingOutlined />
            重置密码
          </Menu.Item>
        )}
        {menu && (
          <ResetPasswordModel
            getRef={ref => {
              this.resetRef = ref;
            }}
          />
        )}
        {menu && <Menu.Divider />}
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return userInfo && userInfo.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <FontIcon className={styles.avatar} type="touxiang" />
          <span className={styles.name}>{userInfo.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user }) => ({
  userInfo: user.userInfo,
}))(AvatarDropdown);

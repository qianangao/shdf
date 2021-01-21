import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import md from 'utility';
import CryptoJS from 'crypto-js';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, VerificationCode, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = values => {
    const { dispatch } = props;
    // 对称加密算法
    const encrypt = word => {
      const key = CryptoJS.enc.Utf8.parse('liantong20190410');
      const srcs = CryptoJS.enc.Utf8.parse(word);
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.toString();
    };

    dispatch({
      type: 'login/login',
      payload: {
        username: values.username ? encrypt(values.username) : '',
        password: values.password ? md.md5(values.password) : '',
        verifyCode: values.verifyCode,
      },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误" />
          )}

          <UserName
            name="username"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <VerificationCode
            name="verifyCode"
            placeholder="请输入验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

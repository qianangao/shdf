import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  SafetyCertificateTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: (
        <UserOutlined
          style={{
            color: '#EA4814',
          }}
          className={styles.prefixIcon}
        />
      ),
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <LockTwoTone twoToneColor="#EA4814" className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!',
      },
    ],
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <MobileTwoTone twoToneColor="#EA4814" className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!',
      },
    ],
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <MailTwoTone className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!',
      },
    ],
  },
  VerificationCode: {
    props: {
      size: 'large',
      prefix: <SafetyCertificateTwoTone twoToneColor="#EA4814" className={styles.prefixIcon} />,
      placeholder: 'verificationCode',
    },
    rules: [
      {
        required: true,
        message: 'Please enter VerificationCode!',
      },
    ],
  },
};

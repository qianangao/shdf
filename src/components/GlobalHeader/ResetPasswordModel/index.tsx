import { Input, Modal, Form, Alert } from 'antd';

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';

import md from 'utility';

const ResetPasswordModel = ({ dispatch, userInfo, resetResault, submitLoading, getRef }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getRef({
      showModal: _ => {
        setModalVisible(true);
      },
    });
  }, []);

  const passwordValidator = (rule, value) => {
    const passwordPattern = new RegExp(
      '(?=^.{8,20}$)(?=.*\\d)(?![.\n])(?=.*\\W+)(?=.*[a-zA-Z]).*$',
    );

    if (passwordPattern.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('密码应为8-20位，且必须包含数字、字母和特殊符号!'));
  };

  const onResetPasswordConmit = value => {
    dispatch({
      type: 'user/resetPassword',
      payload: {
        rawPassword: md.md5(value.rawPassword),
        newPassword: md.md5(value.password),
        id: userInfo.id,
        updateUserId: userInfo.id,
      },
    });
  };

  const onResetModalCancel = () => {
    form.resetFields();
    dispatch({
      type: 'user/clearResetPasswordResponse',
    });
    setModalVisible(false);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  return (
    <Modal
      title="重置密码"
      width={420}
      visible={modalVisible}
      confirmLoading={submitLoading}
      onOk={() => {
        form.submit();
      }}
      onCancel={onResetModalCancel}
    >
      {resetResault && resetResault.error && (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message={resetResault.returnMessageDisplay}
          type="error"
          showIcon
        />
      )}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        scrollToFirstError
        onFinish={onResetPasswordConmit}
      >
        <Form.Item
          name="rawPassword"
          label="原密码"
          rules={[
            {
              required: true,
              message: '请输入原密码!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入新密码!',
            },
            {
              validator: passwordValidator,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ user, loading }) => ({
  userInfo: user.userInfo,
  resetResault: user.reserPasswordResponse,
  submitLoading: loading.effects['user/resetPassword'],
}))(ResetPasswordModel);

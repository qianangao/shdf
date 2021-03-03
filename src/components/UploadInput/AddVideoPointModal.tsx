import { formatDateStr } from '@/utils/format';
import { Modal, Form, Input, TimePicker } from 'antd';
import React, { useState, useEffect } from 'react';

const AuthorizeModal = ({ actionRef, callbackPoint }) => {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const onResetModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  const authorizeClue = (params: any) => {
    callbackPoint &&
      callbackPoint({
        pointName: params.pointName,
        pointStartTime: formatDateStr(params.pointStartTime, 'HH:mm:ss'),
      });
    onResetModalCancel();
  };

  return (
    <Modal
      title="新增视频关键点"
      width={580}
      visible={modalVisible}
      onOk={() => {
        form.submit();
      }}
      onCancel={onResetModalCancel}
    >
      <Form form={form} scrollToFirstError layout="vertical" onFinish={authorizeClue}>
        <Form.Item
          name="pointName"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pointStartTime"
          label="起始时间"
          rules={[
            {
              required: true,
              message: '请输入起始时间!',
            },
          ]}
        >
          <TimePicker style={{ width: '100%' }} format="HH:mm:ss" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AuthorizeModal;

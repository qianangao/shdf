import { Modal, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import StaffMultiSelectInput from '@/components/StaffMultiSelectInput';

const AuthorizeModal = ({ dispatch, loading, actionRef }) => {
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [clueId, setClueId] = useState(undefined);

  const showModal = id => {
    setClueId(id);
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
    setClueId(undefined);
  };

  const authorizeClue = (params: any) =>
    new Promise(resolve => {
      dispatch({
        type: 'emClueManagement/authorizeClue',
        payload: {
          clueId,
          list: params.list,
        },
        resolve,
      });
    })
      .then(_ => {
        onResetModalCancel();
      })
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });

  return (
    <Modal
      title="线索信息授权"
      width={500}
      visible={modalVisible}
      confirmLoading={loading}
      onOk={() => {
        form.submit();
      }}
      onCancel={onResetModalCancel}
    >
      <Form form={form} scrollToFirstError layout="vertical" onFinish={authorizeClue}>
        <Form.Item
          name="list"
          label="授权人员"
          rules={[
            {
              required: true,
              message: '请选择需要授权的人员!',
            },
          ]}
        >
          <StaffMultiSelectInput />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ loading }) => ({
  loading: loading.effects['emClueManagement/authorizeClue'],
}))(AuthorizeModal);

import { Input, Modal, Form } from 'antd';

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import StaffMultiSelectInput from '@/components/StaffMultiSelectInput';

const CommitExamineModal = ({ dispatch, loading, actionRef }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [noticeId, setNoticeId] = useState('');

  const showModal = (items: any) => {
    setNoticeId(items.noticeId);
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

  const commitReplyMessage = (params: any) =>
    new Promise(resolve => {
      dispatch({
        type: 'soAnnouncementMgt/commitExamineAnnouncement',
        payload: {
          noticeId,
          auditUser: params.auditUser,
          remarks: params.remarks,
        },
        resolve,
      });
    })
      .then(_ => {
        setModalVisible(false);
      })
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });

  const onResetModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  return (
    <Modal
      title="提交审核"
      width={500}
      visible={modalVisible}
      confirmLoading={loading}
      onOk={() => {
        form.submit();
      }}
      onCancel={onResetModalCancel}
    >
      <Form form={form} scrollToFirstError layout="vertical" onFinish={commitReplyMessage}>
        <Form.Item
          name="auditUser"
          label="审核人员"
          rules={[
            {
              required: true,
              message: '请选择审核人员!',
            },
          ]}
        >
          <StaffMultiSelectInput />
        </Form.Item>
        <Form.Item
          name="remarks"
          label="留言备注"
          rules={[
            {
              required: true,
              message: '请输入留言备注!',
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['soAnnouncementMgt/commitExamineAnnouncement'],
}))(CommitExamineModal);

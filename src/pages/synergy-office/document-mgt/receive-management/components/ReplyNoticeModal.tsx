import { Input, Modal, Form } from 'antd';

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';

const ReplyNoticeModal = ({ dispatch, loading, actionRef }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [readingId, setReadingId] = useState('');

  const showModal = (id: any) => {
    setReadingId(id);
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
        type: 'documentMgt/replyAnnouncement',
        payload: {
          readingId,
          replyContent: params.replyContent,
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

  const onResetModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  return (
    <Modal
      title="回复提示"
      width={580}
      visible={modalVisible}
      confirmLoading={loading}
      onOk={() => {
        form.submit();
      }}
      onCancel={onResetModalCancel}
    >
      <Form form={form} scrollToFirstError layout="vertical" onFinish={commitReplyMessage}>
        <Form.Item
          name="replyContent"
          label="回复内容"
          rules={[
            {
              required: true,
              message: '请输入回复内容!',
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 5, maxRows: 8 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['documentMgt/replyAnnouncement'],
}))(ReplyNoticeModal);

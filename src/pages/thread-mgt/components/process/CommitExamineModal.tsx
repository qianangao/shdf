import { Input, Modal, Form } from 'antd';

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import StaffMultiSelectInput from '@/components/StaffMultiSelectInput';

const CommitExamineModal = ({ dispatch, loading, actionRef, hidePreView }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [clueId, setClueId] = useState(undefined);
  const [circulationId, setCirculationId] = useState(undefined);

  const showModal = (id: any, cId: any) => {
    setClueId(id);
    setCirculationId(cId);
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
        type: 'emClueManagement/commitExamineClue',
        payload: {
          clueId,
          circulationId,
          approvalUnit: '全国SHDF办公室',
          approvalUser: params.approvalUser,
          approvalOpinion: params.approvalOpinion,
        },
        resolve,
      });
    })
      .then(_ => {
        hidePreView && hidePreView(true);
        onResetModalCancel();
      })
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });

  const onResetModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
    setClueId(undefined);
  };

  return (
    <Modal
      title="提交审核"
      width={580}
      centered
      visible={modalVisible}
      confirmLoading={loading}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(90vh - 108px)',
        overflow: 'auto',
      }}
      onOk={() => {
        form.submit();
      }}
      onCancel={onResetModalCancel}
    >
      <Form form={form} scrollToFirstError layout="vertical" onFinish={commitReplyMessage}>
        <Form.Item
          name="approvalUser"
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
          name="approvalOpinion"
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
  loading: loading.effects['emClueManagement/commitExamineClue'],
}))(CommitExamineModal);

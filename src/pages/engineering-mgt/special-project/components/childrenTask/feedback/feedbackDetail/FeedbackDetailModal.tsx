import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FeedbackDetailForm from './FeedbackDetailForm';
// import FeedbackTable from './FeedbackTable';

const FeedbackDetailModal = ({ dispatch, actionRef, loading }) => {
  const [form] = FeedbackDetailForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = id => {
    if (id) {
      updateData(id);
      setModalVisible(true);
    }
  };
  const updateData = id => {
    // if (id) {
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/findChildrenTaskDetail',
        payload: { feedbackLogId: id },
        resolve,
      });
    }).then(res => {
      if (res) {
        form.setFieldsValue({ ...res });
      }
    });
    // }
  };
  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    hideModal();
  };

  return (
    <Modal
      title="反馈详情"
      centered
      width="60vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <FeedbackDetailForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(FeedbackDetailModal);

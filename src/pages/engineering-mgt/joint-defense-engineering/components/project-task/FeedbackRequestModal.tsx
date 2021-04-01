import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FeedbackTable from './FeedbackTable';

const FeedbackRequestModal = ({ actionRef, loading }) => {
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

  const onChange = () => {
    hideModal();
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    hideModal();
  };

  return (
    <Modal
      title="选择反馈阶段"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      // zIndex={4000}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <FeedbackTable onChange={onChange} />
    </Modal>
  );
};

export default connect(({ loading }) => ({ loading: loading.models.smDictionaryMgt }))(
  FeedbackRequestModal,
);

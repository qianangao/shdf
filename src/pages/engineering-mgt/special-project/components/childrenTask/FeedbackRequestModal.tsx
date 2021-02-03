import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FeedbackTable from './FeedbackTable';

const FeedbackRequestModal = ({ dispatch, actionRef, loading }) => {
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

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    return new Promise(resolve => {
      dispatch({
        type: `specialAction/addChildrenTaskList`,
        payload: {
          ...values,
        },
        resolve,
      });
    })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="选择反馈阶段"
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
      <FeedbackTable />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(FeedbackRequestModal);

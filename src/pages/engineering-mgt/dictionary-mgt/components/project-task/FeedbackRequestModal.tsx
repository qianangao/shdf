import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SummaryFeedbackTable from './SummaryFeedbackTable';

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
    // setData([...data])
    hideModal();
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    hideModal();
    // return new Promise(resolve => {
    //   dispatch({
    //     type: `dictionaryMgt/addFeedback`,
    //     payload: {
    //       ...values,
    //     },
    //     resolve,
    //   });
    // })
    //   .then(() => {
    //     hideModal();
    //   })
    //   .catch(info => {
    //     console.error('Validate Failed:', info);
    //   });
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
      zIndex={4000}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SummaryFeedbackTable onChange={onChange} select />
    </Modal>
  );
};

export default connect(({ loading }) => ({ loading: loading.models.smDictionaryMgt }))(
  FeedbackRequestModal,
);

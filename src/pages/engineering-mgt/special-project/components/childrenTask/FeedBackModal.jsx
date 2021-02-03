import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FeedbackForm from './FeedbackForm';
// import FeedbackTable from './FeedbackTable';

const FeedbackModal = ({ dispatch, actionRef, loading }) => {
  const [form] = FeedbackForm.useForm();
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
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `specialAction/addChildrenTaskList`,
            payload: {
              ...values,
            },
            resolve,
          });
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
      title="任务反馈"
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
      <FeedbackForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(FeedbackModal);

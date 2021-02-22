import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FeedbackForm from './FeedbackForm';
// import FeedbackTable from './FeedbackTable';

const FeedbackModal = ({ dispatch, actionRef, loading, openFeedbackReqModal, FeedbackData }) => {
  const [form] = FeedbackForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskId, setTaskId] = useState('');
  const showModal = id => {
    setTaskId(id);
    updateData(id);
    setModalVisible(true);
  };
  const updateData = id => {
    // if (id) {
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/findChildrenTaskDetail',
        payload: { id },
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
    form
      .validateFields()
      .then(values => {
        const fileIds =
          values.fileIds &&
          values.fileIds.map(item => {
            return item.uid;
          });

        return new Promise(resolve => {
          dispatch({
            type: `specialAction/addFeedback`,
            payload: {
              ...values,
              fileIds,
              taskId,
              feedbackId: FeedbackData[0].feedbackId,
              feedbackType: FeedbackData[0].feedbackType,
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
      <FeedbackForm form={form} openFeedbackReqModal={openFeedbackReqModal} />
    </Modal>
  );
};

export default connect(({ loading, specialAction }) => ({
  loading: loading.models.smDictionaryMgt,
  FeedbackData: specialAction.FeedbackData,
}))(FeedbackModal);

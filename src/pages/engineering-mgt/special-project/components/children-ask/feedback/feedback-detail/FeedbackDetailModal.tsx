import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FeedbackDetailForm from './FeedbackDetailForm';

const FeedbackDetailModal = ({ dispatch, actionRef, loading }) => {
  const [form] = FeedbackDetailForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = id => {
    if (id) {
      setModalVisible(true);
      updateData(id);
    }
  };
  const updateData = id => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'specialAction/feedbackDetail',
          payload: { feedbackLogId: id },
          resolve,
        });
      }).then(res => {
        if (res) {
          const fileInfoList =
            res.fileInfoList &&
            res.fileInfoList.map(item => {
              return {
                url: item.url,
                uid: item.fileId,
                name: item.fileName,
                status: 'done',
              };
            });
          form.setFieldsValue({ ...res, fileIds: fileInfoList });
        }
      });
    } else {
      form.setFieldsValue({});
    }
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
      width="580px"
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

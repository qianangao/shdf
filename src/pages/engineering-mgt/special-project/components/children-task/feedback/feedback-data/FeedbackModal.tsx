import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { message, Modal } from 'antd';
import FeedbackForm from './FeedbackForm';

const useQuery = () => new URLSearchParams(useLocation().search);
const FeedbackModal = ({ dispatch, actionRef, loading, openFeedbackReqModal, FeedbackData }) => {
  const query = useQuery();
  const [form] = FeedbackForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskId, setTaskId] = useState('');
  const updateData = id => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'specialAction/findChildrenTaskDetail',
          payload: { taskId: id },
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
                secrecyLevel: item.secrecyLevel,
              };
            });
          form.setFieldsValue({ ...res, fileIds: fileInfoList });
        }
      });
    }
  };
  const showModal = id => {
    setTaskId(id);
    updateData(id);
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }

    if (query.get('type') === 'modify' && query.get('id') && query.get('status') === '1') {
      showModal({ id: query.get('id'), disabled: false, add: true });
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
        let tempLevel = '';
        const fileIds =
          values.fileIds &&
          values.fileIds.map(item => {
            if (tempLevel < item.secrecyLevel) {
              tempLevel = item.secrecyLevel;
            }
            return item.uid;
          });
        if (tempLevel > values.secrecyLevel) {
          message.error('??????????????????????????????????????????');
          return '';
        }
        return new Promise(resolve => {
          dispatch({
            type: `specialAction/addFeedback`,
            payload: {
              ...values,
              fileIds,
              taskId,
              feedbackId: FeedbackData.length && FeedbackData[0].feedbackId,
              feedbackType: FeedbackData.length && FeedbackData[0].feedbackType,
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
      title="????????????"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
      // zIndex={2000}
    >
      <FeedbackForm form={form} openFeedbackReqModal={openFeedbackReqModal} />
    </Modal>
  );
};

export default connect(({ loading, specialAction }) => ({
  loading: loading.models.smDictionaryMgt,
  FeedbackData: specialAction.FeedbackData,
}))(FeedbackModal);

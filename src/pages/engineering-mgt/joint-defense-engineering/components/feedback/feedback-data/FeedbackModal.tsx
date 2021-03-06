import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Modal, message } from 'antd';
import FeedbackForm from './FeedbackForm';
// import FeedbackTable from './FeedbackTable';

const useQuery = () => new URLSearchParams(useLocation().search);
const FeedbackModal = ({ dispatch, actionRef, loading, feedbackRequestModal, FeedbackData }) => {
  const query = useQuery();
  const [form] = FeedbackForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskId, setTaskId] = useState('');
  const showModal = id => {
    setTaskId(id);
    updateData(id);
    setModalVisible(true);
  };
  const updateData = id => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'defenseEngineering/projectTaskDetail',
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
            type: `defenseEngineering/addFeedback`,
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
      <FeedbackForm form={form} feedbackRequestModal={feedbackRequestModal} />
    </Modal>
  );
};

export default connect(({ loading, defenseEngineering }) => ({
  loading: loading.models.smDictionaryMgt,
  FeedbackData: defenseEngineering.FeedbackData,
}))(FeedbackModal);

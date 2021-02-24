import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import EditChildrenTaskForm from './EditChildrenTaskForm';

const ModifyModal = ({
  dispatch,
  actionRef,
  loading,
  openFeedbackModal,
  openAddModal,
  feedbackDetailModal,
}) => {
  const [form] = EditChildrenTaskForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');

  const updateData = Id => {
    // if (id) {
    new Promise(resolve => {
      dispatch({
        type: 'specialAction/findChildrenTaskDetail',
        payload: { taskId: Id },
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
    // }
  };

  const showModal = item => {
    if (item.visible) {
      setVisible(item.visible);
    }
    if (item.disabled) {
      setDisabled(true);
    }
    if (item.id) {
      setId(item.id);
      updateData(item.id);
    }
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
    setVisible(false);
    setDisabled(false);
    form.resetFields();
  };

  const handleOk = () => {
    if (disabled) {
      hideModal();
    } else {
      form
        .validateFields()
        .then(values => {
          return new Promise(resolve => {
            const fileIds =
              values.fileIds &&
              values.fileIds.map(item => {
                return item.uid;
              });
            dispatch({
              type: `specialAction/${id ? 'updateChildrenTaskList' : 'addChildrenTaskList'}`,
              payload: {
                ...values,
                taskId: id,
                fileIds,
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
    }
  };

  return (
    <Modal
      title={disabled ? '查看任务' : '修改任务'}
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
      <EditChildrenTaskForm
        form={form}
        taskId={id}
        visible={visible}
        disabled={disabled}
        openFeedbackModal={openFeedbackModal}
        openAddModal={openAddModal}
        feedbackDetailModal={feedbackDetailModal}
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

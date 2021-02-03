import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import EditChildrenTaskForm from './EditChildrenTaskForm';

const ModifyModal = ({ dispatch, actionRef, loading, openFeedbackModal, openAddModal }) => {
  const [form] = EditChildrenTaskForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const showModal = item => {
    if (item.disabled) {
      setDisabled(true);
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
    setDisabled(false);
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
        disabled={disabled}
        openFeedbackModal={openFeedbackModal}
        openAddModal={openAddModal}
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, message } from 'antd';
import ChildrenTaskForm from './ChildrenTaskForm';

const AddchildrenTaskModal = ({ dispatch, actionRef, loading, specialAction }) => {
  const [actionId, setActionId] = useState('');
  const [form] = ChildrenTaskForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = item => {
    if (item.visible) {
      setVisible(item.visible);
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
  useEffect(() => {
    if (specialAction.actionId) {
      setActionId(specialAction.actionId);
    }
  });

  const hideModal = () => {
    setModalVisible(false);
    setVisible(false);
    setActionId('');
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
          message.error('附件密级不能大于该数据密级！');
          return '';
        }
        return new Promise(resolve => {
          dispatch({
            type: `specialAction/addChildrenTaskList`,
            payload: {
              ...values,
              actionId,
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
  };

  return (
    <Modal
      title="新建子任务"
      centered
      width="90vw"
      style={{ paddingBottom: 0, zIndex: 100 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      // zIndex={2000}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <ChildrenTaskForm form={form} visible={visible} />
    </Modal>
  );
};

export default connect(({ loading, specialAction }) => ({
  loading: loading.models.smDictionaryMgt,
  specialAction,
}))(AddchildrenTaskModal);

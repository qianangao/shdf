import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ProjectTaskForm from './ProjectTaskForm';

const AddProjectTaskModal = ({ dispatch, actionRef, loading, dictionaryMgt }) => {
  const [projectId, setProjectId] = useState('');
  const [form] = ProjectTaskForm.useForm();
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
  useEffect(() => {
    if (dictionaryMgt.projectId) {
      setProjectId(dictionaryMgt.projectId);
    }
  });

  const hideModal = () => {
    setModalVisible(false);
    setProjectId('');
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
            type: `dictionaryMgt/addProjectTaskList`,
            payload: {
              ...values,
              projectId,
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
      title="新建任务"
      centered
      width="90vw"
      style={{ paddingBottom: 0, zIndex: 100 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      zIndex={2000}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <ProjectTaskForm form={form} />
    </Modal>
  );
};

export default connect(({ loading, dictionaryMgt }) => ({
  loading: loading.models.smDictionaryMgt,
  dictionaryMgt,
}))(AddProjectTaskModal);

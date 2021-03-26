import React, { useState, useEffect } from 'react';
import { connect, useLocation } from 'umi';
import { Modal, message } from 'antd';
import EditProjectTaskForm from './EditProjectTaskForm';

const useQuery = () => new URLSearchParams(useLocation().search);

const ModifyProjectTaskModal = ({
  dispatch,
  actionRef,
  loading,
  addProjectTaskModal,
  feedbackDetailModal,
}) => {
  const query = useQuery();
  const [form] = EditProjectTaskForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [add, setAdd] = useState(false);

  const updateData = Id => {
    if (Id) {
      new Promise(resolve => {
        dispatch({
          type: 'defenseEngineering/projectTaskDetail',
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
                secrecyLevel: item.secrecyLevel,
              };
            });
          form.setFieldsValue({ ...res, fileIds: fileInfoList });
        }
      });
    }
  };

  const showModal = item => {
    if (item.visible) {
      setVisible(item.visible);
    }
    if (item.add) {
      setAdd(item.add);
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

    if (query.get('type') === 'modify' && query.get('id')) {
      showModal({ caseId: query.get('id') });
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
              type: `defenseEngineering/updateProjectTaskList`,
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
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <EditProjectTaskForm
        form={form}
        taskId={id}
        visible={visible}
        disabled={disabled}
        add={add}
        addProjectTaskModal={addProjectTaskModal}
        feedbackDetailModal={feedbackDetailModal}
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyProjectTaskModal);

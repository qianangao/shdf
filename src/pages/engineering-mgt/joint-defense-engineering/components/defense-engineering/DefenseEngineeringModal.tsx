import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, message } from 'antd';
import DefenseEngineeringForm from './DefenseEngineeringForm';

const DefenseEngineeringModal = ({ dispatch, actionRef, loading }) => {
  const [form] = DefenseEngineeringForm.useForm();
  const [defenseForm, setDefenseForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const updateData = data => {
    const fileInfoList =
      data.fileInfoList &&
      data.fileInfoList.map(item => {
        return {
          url: item.url,
          uid: item.fileId,
          name: item.fileName,
          status: 'done',
          secrecyLevel: item.secrecyLevel,
        };
      });
    form.setFieldsValue({ ...data, fileIds: fileInfoList });
  };

  const showModal = item => {
    if (item.engineeringForm) {
      setDefenseForm(item.engineeringForm);
      updateData(item.engineeringForm);
    }
    // add为true，新增工程，edit为true，编辑工程数据
    if (item.add) {
      setAdd(true);
    }
    if (item.edit) {
      setEdit(true);
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
    setDefenseForm(null);
    setAdd(false);
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
        if (defenseForm) {
          values.projectId = defenseForm.projectId;
        }
        return new Promise(resolve => {
          dispatch({
            type: `defenseEngineering/${defenseForm ? 'editEngineering' : 'addEngineering'}`,
            payload: {
              ...values,
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
      title={defenseForm ? '编辑联防工程' : '新增联防工程'}
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
      <DefenseEngineeringForm form={form} add={add} edit={edit} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(DefenseEngineeringModal);

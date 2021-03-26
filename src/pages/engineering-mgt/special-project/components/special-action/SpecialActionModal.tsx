import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, message } from 'antd';
import SpecialActionForm from './SpecialActionForm';

const SpecialActionModal = ({ dispatch, actionRef, loading }) => {
  const [form] = SpecialActionForm.useForm();
  const [actionForm, setActionForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    if (item) {
      setActionForm(item);
      updateData(item);
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
    setActionForm(null);
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
        if (actionForm) {
          values.actionId = actionForm.actionId;
        }
        return new Promise(resolve => {
          dispatch({
            type: `specialAction/${actionForm ? 'editSpecialAction' : 'addSpecialAction'}`,
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
      title={actionForm ? '编辑专项行动' : '新增专项行动'}
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
      <SpecialActionForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(SpecialActionModal);

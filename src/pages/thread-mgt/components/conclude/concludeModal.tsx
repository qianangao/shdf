import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ConcludeBookForm from './concludeBookForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = ConcludeBookForm.useForm();
  const [conclude, setConclude] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [concludeStaus, setConcludeStaus] = useState('');
  const showModal = data => {
    setConclude(data);
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
    form.resetFields();
    setConcludeStaus('');
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        setConcludeStaus(values.AdministrativePrompt);
        return new Promise(resolve => {
          dispatch({
            type: 'emClueManagement/concludeTheMatter',
            payload: {
              clueId: conclude.clueId,
              circulationId: conclude.sourceClueId,
              processingResults: 2,
              opinion: values.opinion,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
        if (concludeStaus === '0') {
          setModalVisible(false);
        }
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="转办提示"
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
      <ConcludeBookForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

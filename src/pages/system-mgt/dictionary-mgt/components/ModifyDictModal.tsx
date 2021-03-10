import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import DictionaryForm from './DictionaryForm';

const ModifyDictModal = ({ dispatch, actionRef, loading }) => {
  const [form] = DictionaryForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [detailDictData, setDictDetailData] = useState(null);

  const showModal = items => {
    if (items && items !== 'undefined') {
      setDictDetailData(items);
    } else {
      setDictDetailData(null);
      form.resetFields();
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
    // form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `smDictionaryMgt/${detailDictData ? 'updateType' : 'addType'}`,
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
      title={`${detailDictData ? '修改类型' : '新增类型'}`}
      centered
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <DictionaryForm form={form} orgInfoData={detailDictData} />
    </Modal>
  );
};

export default connect(({ smDictionaryMgt, loading }) => ({
  smDictionaryMgt,
  loading: loading.models.smDictionaryMgt,
}))(ModifyDictModal);

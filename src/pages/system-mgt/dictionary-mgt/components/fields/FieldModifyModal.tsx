import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FieldForm from './FieldForm';

const DictionaryModifyModal = ({ dispatch, actionRef, dictTypeId, loading }) => {
  const [form] = FieldForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [fieldData, setFieldData] = useState(null);
  const [id, setId] = useState(null);

  const showModal = items => {
    setModalVisible(true);
    if (items && items !== 'undefined') {
      setId(items.dictId);
      setFieldData(items);
    } else {
      setId(null);
      form.resetFields();
      setFieldData(null);
    }
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
    setFieldData({});
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `smDictionaryMgt/${id ? 'updateDict' : 'addDict'}`,
            payload: {
              ...values,
              dictTypeId,
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
      title={id ? '编辑字典' : '新增字典'}
      centered
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <FieldForm form={form} dictData={fieldData} id={id} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(DictionaryModifyModal);

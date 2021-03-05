import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import FieldForm from './FieldForm';

const DictionaryModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = FieldForm.useForm();
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [fieldData, setFieldData] = useState({});

  const showModal = items => {
    setModalVisible(true);
    setFieldData(items);
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
          values.dictTypeId = fieldData.dictTypeId;
          dispatch({
            type: `smDictionaryMgt/addDict`,
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
      title="新增字段"
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
      <FieldForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(DictionaryModifyModal);

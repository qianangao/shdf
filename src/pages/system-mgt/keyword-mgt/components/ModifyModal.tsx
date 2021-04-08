import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import KeywordForm from './KeywordForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = KeywordForm.useForm();
  const [orgInfoData, setOrgInfoData] = useState(null);
  const [modifyModalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setOrgInfoData(items || null);
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
    setOrgInfoData(null);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `keywrod/${orgInfoData ? 'update' : 'add'}`,
            payload: {
              ...values,
              keyWordId: orgInfoData ? orgInfoData.keyWordId : undefined,
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
      title={orgInfoData ? '编辑关键字' : '新增关键字'}
      centered
      width={680}
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
      <KeywordForm form={form} orgInfoData={orgInfoData} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.orgTree,
}))(ModifyModal);

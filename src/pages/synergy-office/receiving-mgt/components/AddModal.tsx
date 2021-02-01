import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './ReceivingForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = OrgInfoForm.useForm();
  const [orgInfoData, setOrgInfoData] = useState(null);
  const [addModalVisible, setModalVisible] = useState(false);
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
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: 'receivingMgt/add',
            payload: {
              ...values,
            },
            resolve,
          });
          setTimeout(function () {
            setModalVisible(false);
          }, 2000);
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
      title="收文登记"
      centered
      width={780}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <OrgInfoForm form={form} orgInfoData={orgInfoData} />
    </Modal>
  );
};

export default connect(({ receivingMgt, loading }) => ({
  receivingMgt,
  loading: loading.models.receivingMgt,
}))(AddModal);

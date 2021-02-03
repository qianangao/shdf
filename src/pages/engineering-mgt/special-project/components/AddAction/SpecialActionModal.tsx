import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddSpecialActionForm from './AddSpecialActionForm';

const SpecialActionModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddSpecialActionForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = item => {
    setDetailData(item || null);
    if (item) setVisible(true);
    // if(item) updateData(item)
    setModalVisible(true);
  };
  // const updateData = data => {
  //   form.setFieldsValue({ ...data });
  // };

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
            type: `specialAction/${detailData ? 'addAnnualSpecialAction' : 'addSpecialAction'}`,
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
      title={detailData ? '新增年度专项行动' : '新增专项行动'}
      centered
      width="60vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <AddSpecialActionForm form={form} visible={visible} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(SpecialActionModal);

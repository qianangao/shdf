import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddressBookForm from './AddressBookForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddressBookForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setDetailData(items || null);
    if (items) form.setFieldsValue({ ...items });
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
            type: `emAddressBook/${detailData ? 'updateAddressBook' : 'addAddressBook'}`,
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
      title={detailData ? '编辑通讯录' : '新增通讯录'}
      centered
      width="40vw"
      okText="提交"
      cancelText="重置"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <AddressBookForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddressBookForm from './AddressBookForm';

const TableModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddressBookForm.useForm();
  const [userId, setuserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = userIds => {
    setuserId(userIds || null);
    updateData(userIds);
    setModalVisible(true);
  };

  const updateData = userIds => {
    if (userIds) {
      new Promise(resolve => {
        dispatch({
          type: 'userMgt/getUserDetail',
          payload: { userIds },
          resolve,
        });
      }).then(res => {
        if (res) form.setFieldsValue({ ...res });
      });
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
    setuserId(null);
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `userMgt/${userId ? 'updateUser' : 'addUser'}`,
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
      title={userId ? '编辑通讯录' : '新增通讯录'}
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
      <AddressBookForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(TableModifyModal);

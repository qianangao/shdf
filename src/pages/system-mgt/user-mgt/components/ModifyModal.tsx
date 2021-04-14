import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddressBookForm from './AddressBookForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AddressBookForm.useForm();
  const [userId, setuserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const updateData = userIds => {
    if (userIds) {
      new Promise(resolve => {
        dispatch({
          type: 'userMgt/getUserDetail',
          payload: { userId: userIds },
          resolve,
        });
      }).then(res => {
        if (res)
          form.setFieldsValue({
            ...res,
            orgObj: {
              name: res.orgName,
              id: res.orgId,
            },
          });
      });
    }
  };
  const showModal = userIds => {
    setuserId(userIds || null);
    updateData(userIds);
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
    setuserId(null);
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        values.orgId = values.orgObj.id;

        return new Promise(resolve => {
          dispatch({
            type: `userMgt/${userId ? 'updateUser' : 'addUser'}`,
            payload: {
              ...values,
              orgId: values.orgObj.id,
              orgName: values.orgObj.name,
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
      title={userId ? '编辑用户' : '新增用户'}
      centered
      width="90vw"
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

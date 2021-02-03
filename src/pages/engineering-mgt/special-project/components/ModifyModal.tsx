import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ChildrenTaskForm from './ChildrenTaskForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = ChildrenTaskForm.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    // setDetailData(bookId || null);
    // updateData(bookId);
    setModalVisible(true);
  };

  // const updateData = bookId => {
  //   if (bookId) {
  //     new Promise(resolve => {
  //       dispatch({
  //         type: 'emAddressBook/getAddressBookDetail',
  //         payload: bookId.toString(),
  //         resolve,
  //       });
  //     }).then(res => {
  //       if (res) form.setFieldsValue({ ...res });
  //     });
  //   }
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
            type: `specialAction/addChildrenTaskList`,
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
      title="子任务信息"
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
      <ChildrenTaskForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyModal);

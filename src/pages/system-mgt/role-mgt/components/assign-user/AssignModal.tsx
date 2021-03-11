import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AssignTable from './AssignTable';

const AssignModal = ({ dispatch, loading, actionRef, modifyUserModal }) => {
  // const [form] = AssignTable.useForm();
  // const [detailData, setDetailData] = useState(null);
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
            type: `smRoleMgt/distributeUser`,
            payload: {
              ...values,
              // bookId: detailData && detailData.toString(),
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
      title="工作人员信息"
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
      <AssignTable modifyUserModal={modifyUserModal} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(AssignModal);

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TempProvinceForm from './tempProvinceForm';

const TempProvinceModal = ({ actionRef, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = TempProvinceForm.useForm();

  const showModal = () => {
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
              bookId: detailData && detailData.toString(),
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
      title="新增临时省份"
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
      <TempProvinceForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({ loading: loading.models.smDictionaryMgt }))(
  TempProvinceModal,
);

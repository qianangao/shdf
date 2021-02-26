import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import OrgInfoForm from './ReceivingForm';

const AddModal = ({ dispatch, actionRef, loading, receivingMgt }) => {
  const [form] = OrgInfoForm.useForm();
  const [addModalVisible, setModalVisible] = useState(false);
  const { receivingDetailData } = receivingMgt;
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
          let filesStr = '';
          if (values.files && values.files.length > 0) {
            values.files.forEach(item => {
              filesStr += `${item.uid},`;
            });
            filesStr = filesStr.substr(0, filesStr.length - 1);
          }
          delete values.files;
          values.fileIds = filesStr;
          dispatch({
            type: 'receivingMgt/add',
            payload: {
              ...values,
            },
            resolve,
          });
          setTimeout(() => {
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
      width="90vw"
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
      <OrgInfoForm form={form} orgInfoData={receivingDetailData} />
    </Modal>
  );
};

export default connect(({ receivingMgt, loading }) => ({
  receivingMgt,
  loading: loading.models.receivingMgt,
}))(AddModal);

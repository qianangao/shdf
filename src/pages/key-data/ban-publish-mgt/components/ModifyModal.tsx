import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import BanPublishForm from './banPublishForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = BanPublishForm.useForm();
  const [publicationId, setPublicationId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setPublicationId(id || undefined);
    setModalVisible(true);
  };

  useEffect(() => {
    if (publicationId) {
      getBanPublishDetail(publicationId);
    }
  }, [publicationId]);

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
    setPublicationId(undefined);
    form.resetFields();
  };

  const getBanPublishDetail = (id: any) => {
    new Promise(resolve => {
      dispatch({
        type: 'kdBanPublishMgt/getBanPublishDetail',
        payload: { publicationId: id },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          form.setFieldsValue(data);
        }
      })
      .catch(_ => {});
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `kdBanPublishMgt/${publicationId ? 'updateBanPublish' : 'addBanPublish'}`,
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
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={publicationId ? '非法出版物编辑' : '非法出版物录入'}
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
      <BanPublishForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.kdBanPublishMgt,
}))(ModifyModal);
